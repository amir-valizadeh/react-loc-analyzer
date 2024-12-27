# react-loc-analyzer

A powerful and flexible Lines of Code (LOC) analyzer specifically designed for React projects. Get detailed insights about your codebase with beautiful formatted tables and comprehensive statistics.

![NPM Version](https://img.shields.io/npm/v/react-loc-analyzer)
![License](https://img.shields.io/npm/l/react-loc-analyzer)

## Features

- 📊 Detailed code statistics with formatted tables
- 🎨 Colored output for better readability
- ⚡ Fast asynchronous file processing
- 🔍 Smart code detection (distinguishes between code, comments, and empty lines)
- 🎯 React-focused file type analysis
- 🚀 Easy to use with npx
- ⚙️ Configurable file extensions and ignore patterns

## Installation

You can use it directly with npx (no installation required):

```bash
npx react-loc-analyzer
```

Or install it globally:

```bash
npm install -g react-loc-analyzer
```

## Usage

### Basic Usage

Analyze the current directory:
```bash
npx react-loc-analyzer
```

Analyze a specific directory:
```bash
npx react-loc-analyzer /path/to/your/react/project
```

### Options

```bash
npx react-loc-analyzer [directory] [options]

Options:
  -V, --version              output version number
  -e, --exclude <patterns>   additional patterns to exclude (comma-separated)
  -i, --include <extensions> additional file extensions to include (comma-separated)
  --no-color                 disable colored output
  -h, --help                display help for command
```

### Examples

Analyze with additional exclude patterns:
```bash
npx react-loc-analyzer --exclude .cache,public,static
```

Include additional file extensions:
```bash
npx react-loc-analyzer --include .vue,.svelte
```

## Output

The analyzer provides two main tables:

### 1. Project Summary
Shows overall statistics including:
- Total Files
- Total Lines
- Code Lines
- Comment Lines
- Empty Lines

### 2. Files by Type
Detailed breakdown for each file extension:
- Number of files
- Total lines
- Code lines
- Comment lines
- Empty lines
- Percentage of codebase

Example output:
```
Project Summary:
┌───────────────┬────────────┐
│    Metric     │   Value    │
├───────────────┼────────────┤
│ Total Files   │      156   │
│ Total Lines   │   15,234   │
│ Code Lines    │   12,845   │
│ Comment Lines │    1,523   │
│ Empty Lines   │      866   │
└───────────────┴────────────┘

Files by Type:
┌────────────┬───────┬─────────────┬────────────┬───────────────┐
│ Extension  │ Files │ Total Lines │ Code Lines │ % of Codebase │
├────────────┼───────┼─────────────┼────────────┼───────────────┤
│ .tsx       │    87 │      8,456  │     7,234  │        56.3%  │
│ .scss      │    34 │      3,234  │     2,845  │        22.1%  │
│ .jsx       │    23 │      2,456  │     1,923  │        15.0%  │
└────────────┴───────┴─────────────┴────────────┴───────────────┘
```

## Default Configuration

### Included File Extensions
- `.js`, `.jsx`, `.ts`, `.tsx`
- `.css`, `.scss`, `.sass`
- `.html`, `.json`

### Default Ignore Patterns
- `node_modules`
- `build`
- `dist`
- `.git`
- `coverage`
- `.next`
- `out`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

MIT License - see the [LICENSE](LICENSE) file for details