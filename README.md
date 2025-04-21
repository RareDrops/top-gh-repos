# top-gh-repos
![Image](https://github.com/user-attachments/assets/564b907d-bbed-45fe-9f80-6b38e57c145d)
A simple command line interface tool to query the top starred github repository within a specified date

## Features

- Query the top most starred repository within a specified timeframe

## Installation

1. Clone the repository
```bash
git clone https://github.com/RareDrops/top-gh-repos
cd top-gh-repos
```

2. Install dependencies
```bash
npm install
```

3. Test Script (Optional)
```bash
npx top-gh-repos
```

4. Install Globally (Optional) [Recommended]
```bash
npm install -g
```

This allows you to use the command in terminal with:
```bash
top-gh-repos
```

To uninstall the command, use:
```bash
npm uninstall -g top-gh-repos
```


## Usage

### Basic Usage
```bash
top-gh-repos [options]
```
or if you didn't install the command globally, use:
```bash
npx top-gh-repos [options]
```

### Options
**Optional:**
- `start-date` - Start date in DD-MM-YYYY format
- `end-date` - End date in DD-MM-YYYY format
- `limit` - Number of repositories to fetch (default: 5)

### Examples
```bash
# Fetch top 5 repositories of all time
top-gh-repos

# Fetch top 5 repositories from January to December 2023
top-gh-repos 01-01-2023 31-12-2023

# Fetch top 10 repositories from January to December 2023
top-gh-repos 01-01-2023 31-12-2023 10
```

## Contributing
Contributions are welcome! If you have suggestions for improvements or new features, please open an issue or submit a pull request.

## License
MIT © [RareDrop](https://github.com/RareDrops/top-gh-repos)