import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const REACT_EXTENSIONS = [
    '.js', '.jsx', '.ts', '.tsx',
    '.css', '.scss', '.sass',
    '.html', '.json'
];

const DEFAULT_IGNORE = [
    'node_modules',
    'build',
    'dist',
    '.git',
    'coverage',
    '.next',
    'out'
];

export async function countLines(filePath) {
    try {
        const content = await fs.readFile(filePath, 'utf8');
        const lines = content.split('\n');
        const nonEmptyLines = lines.filter(line => line.trim().length > 0);
        const nonCommentLines = nonEmptyLines.filter(line => {
            const trimmed = line.trim();
            return !trimmed.startsWith('//') && !trimmed.startsWith('/*') && !trimmed.startsWith('*');
        });

        return {
            total: lines.length,
            nonEmpty: nonEmptyLines.length,
            code: nonCommentLines.length,
            comments: nonEmptyLines.length - nonCommentLines.length,
            empty: lines.length - nonEmptyLines.length
        };
    } catch (error) {
        console.error(`Error reading file ${filePath}:`, error);
        return { total: 0, nonEmpty: 0, code: 0, comments: 0, empty: 0 };
    }
}

export async function analyzeProject(projectPath = '.', options = {}) {
    const stats = {
        files: 0,
        totalLines: 0,
        codeLines: 0,
        commentLines: 0,
        emptyLines: 0,
        fileTypes: {},
        formatNumber: num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    };

    const extensions = [...REACT_EXTENSIONS, ...(options.additionalExtensions || [])];
    const ignorePatterns = [...DEFAULT_IGNORE, ...(options.excludePatterns || [])];

    async function traverse(currentPath) {
        const files = await fs.readdir(currentPath);

        for (const file of files) {
            const fullPath = path.join(currentPath, file);
            const stat = await fs.stat(fullPath);

            if (stat.isDirectory()) {
                if (!ignorePatterns.includes(file)) {
                    await traverse(fullPath);
                }
                continue;
            }

            const ext = path.extname(file);
            if (!extensions.includes(ext)) continue;

            stats.files++;

            if (!stats.fileTypes[ext]) {
                stats.fileTypes[ext] = {
                    files: 0,
                    totalLines: 0,
                    codeLines: 0,
                    commentLines: 0,
                    emptyLines: 0
                };
            }

            const { total, code, comments, empty } = await countLines(fullPath);

            stats.totalLines += total;
            stats.codeLines += code;
            stats.commentLines += comments;
            stats.emptyLines += empty;

            stats.fileTypes[ext].files++;
            stats.fileTypes[ext].totalLines += total;
            stats.fileTypes[ext].codeLines += code;
            stats.fileTypes[ext].commentLines += comments;
            stats.fileTypes[ext].emptyLines += empty;
        }
    }

    await traverse(projectPath);

    // Format file types data for display
    stats.fileTypes = Object.entries(stats.fileTypes)
        .sort(([, a], [, b]) => b.files - a.files)
        .map(([ext, data]) => ({
            'Extension': ext,
            'Files': stats.formatNumber(data.files),
            'Total Lines': stats.formatNumber(data.totalLines),
            'Code Lines': stats.formatNumber(data.codeLines),
            'Comment Lines': stats.formatNumber(data.commentLines),
            'Empty Lines': stats.formatNumber(data.emptyLines),
            '% of Codebase': `${((data.codeLines / stats.codeLines) * 100).toFixed(1)}%`
        }));

    return stats;
}