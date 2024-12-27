#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { analyzeProject } from '../src/index.js';

const program = new Command();

program
    .name('react-loc')
    .description('Analyze lines of code in React projects')
    .version('1.0.0')
    .argument('[dir]', 'project directory to analyze', '.')
    .option('-e, --exclude <patterns>', 'additional patterns to exclude (comma-separated)')
    .option('-i, --include <extensions>', 'additional file extensions to include (comma-separated)')
    .option('--no-color', 'disable colored output')
    .action(async (dir, options) => {
        const spinner = ora('Analyzing React project...').start();

        try {
            const extraExcludes = options.exclude ? options.exclude.split(',') : [];
            const extraExtensions = options.include ? options.include.split(',').map(ext =>
                ext.startsWith('.') ? ext : `.${ext}`
            ) : [];

            const stats = await analyzeProject(dir, {
                excludePatterns: extraExcludes,
                additionalExtensions: extraExtensions
            });

            spinner.succeed('Analysis complete!');

            // Print summary table
            console.log('\n' + chalk.bold.green('Project Summary:'));
            console.table([
                { metric: 'Total Files', value: stats.formatNumber(stats.files) },
                { metric: 'Total Lines', value: stats.formatNumber(stats.totalLines) },
                { metric: 'Code Lines', value: stats.formatNumber(stats.codeLines) },
                { metric: 'Comment Lines', value: stats.formatNumber(stats.commentLines) },
                { metric: 'Empty Lines', value: stats.formatNumber(stats.emptyLines) }
            ]);

            // Print file types table
            console.log('\n' + chalk.bold.green('Files by Type:'));
            console.table(stats.fileTypes);

        } catch (error) {
            spinner.fail('Analysis failed');
            console.error(chalk.red('Error:'), error.message);
            process.exit(1);
        }
    });

program.parse();