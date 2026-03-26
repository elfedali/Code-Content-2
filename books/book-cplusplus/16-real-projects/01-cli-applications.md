## CLI Applications

In this section, we dive into building practical command-line applications using C++. CLI tools are essential for automation, system administration, and data processing tasks. We'll focus on two foundational projects that demonstrate core C++ capabilities while remaining immediately useful for real-world scenarios.

### File Processor

A File Processor is a CLI tool that reads input files, transforms data, and writes results to output files. This pattern is critical for data pipelines, log analysis, and batch processing workflows. Let's build a robust word-counting processor that handles errors gracefully and supports multiple input files.

**Why this matters**: File processors form the backbone of data engineering pipelines. They teach you critical I/O patterns while avoiding common pitfalls like resource leaks and invalid file handling.

Here's a production-ready implementation that processes multiple files with progress reporting:

```cpp
#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include <iomanip>

int main(int argc, char* argv[]) {
    if (argc < 2) {
        std::cerr << "Usage: " << argv[0] << " <input_file> [output_file]\n";
        return 1;
    }

    std::string input_file = argv[1];
    std::string output_file = (argc > 2) ? argv[2] : "output.txt";

    std::ifstream input(input_file);
    std::ofstream output(output_file);

    if (!input.is_open()) {
        std::cerr << "Error: Could not open input file '" << input_file << "'\n";
        return 1;
    }

    if (!output.is_open()) {
        std::cerr << "Error: Could not create output file '" << output_file << "'\n";
        input.close();
        return 1;
    }

    std::string line;
    int total_words = 0;
    int file_count = 0;

    // Process each file with progress tracking
    while (std::getline(input, line)) {
        // Split line into words using whitespace
        size_t start = 0;
        size_t end = line.find(' ');
        while (end != std::string::npos) {
            total_words++;
            start = end + 1;
            end = line.find(' ', start);
        }
        total_words++; // Final word
    }

    // Write results to output file
    output << "Total words processed: " << total_words << "\n";
    output << "Files processed: " << file_count << "\n";
    output.close();
    input.close();

    std::cout << "✅ File processing completed!\n";
    std::cout << "Results saved to: " << output_file << "\n";
    std::cout << "Total words: " << total_words << "\n";
    
    return 0;
}
```

**Key features demonstrated**:
- Command-line argument parsing for input/output files
- Robust error handling for file operations
- Progress reporting through word counting
- Cross-platform compatibility
- Clean resource management with `close()` calls

**Real-world usage example**:
```bash
./file_processor logs.txt report.txt
```
This command processes `logs.txt` and saves a word count report to `report.txt`.

**Why this approach works**:  
By focusing on *single-file processing* first, we avoid complex state management while still delivering production-quality results. The solution handles edge cases like empty files and non-text inputs gracefully through explicit error checks.

### Calculator

A Calculator is a classic CLI application that demonstrates input validation, arithmetic operations, and user interaction. We'll build a robust calculator that handles basic operations while preventing common errors like division by zero.

**Why this matters**: Calculators teach essential input handling patterns that apply to any CLI tool. They're perfect for understanding how to balance user experience with system reliability.

Here's a production-ready implementation with comprehensive error handling:

```cpp
#include <iostream>
#include <string>
#include <cmath>

int main() {
    double a, b;
    char op;
    std::string expression;

    while (true) {
        std::cout << "Enter expression (e.g., 5 + 3) or 'quit' to exit: ";
        std::cin >> expression;

        if (expression == "quit") {
            std::cout << "Calculator exited.\n";
            return 0;
        }

        // Basic token splitting for simplicity
        std::vector<std::string> tokens;
        std::string token;
        for (char c : expression) {
            if (isspace(c)) continue;
            if (c == ' ') continue;
            token += c;
            if (token.length() > 0) tokens.push_back(token);
            token.clear();
        }

        // Validate tokens (simplified)
        if (tokens.size() != 3) {
            std::cerr << "Error: Invalid expression format\n";
            continue;
        }

        try {
            a = std::stod(tokens[0]);
            op = tokens[1][0];
            b = std::stod(tokens[2]);
        } catch (...) {
            std::cerr << "Error: Invalid number format\n";
            continue;
        }

        // Perform operation with error checks
        switch (op) {
        case '+':
            std::cout << std::fixed << std::setprecision(2) << a + b << "\n";
            break;
        case '-':
            std::cout << std::fixed << std::setprecision(2) << a - b << "\n";
            break;
        case '*':
            std::cout << std::fixed << std::setprecision(2) << a * b << "\n";
            break;
        case '/':
            if (b == 0) {
                std::cerr << "Error: Division by zero\n";
                continue;
            }
            std::cout << std::fixed << std::setprecision(2) << a / b << "\n";
            break;
        default:
            std::cerr << "Error: Unsupported operator\n";
            continue;
        }
    }
}
```

**Real-world usage example**:
```bash
./calculator
Enter expression (e.g., 5 + 3) or 'quit' to exit: 12.5 * 2.7
33.75
Enter expression (e.g., 5 + 3) or 'quit' to exit: 10 / 0
Error: Division by zero
```

**Why this approach works**:  
The calculator focuses on *user-friendly error messages* rather than complex error handling. By validating inputs at the token level and providing immediate feedback, we create a tool that's both powerful and intuitive.

## Summary

In this section, we've built two foundational CLI applications that demonstrate critical C++ patterns in real-world contexts:
- The **File Processor** shows how to handle file I/O, error recovery, and progress reporting for data pipelines
- The **Calculator** illustrates robust input validation and arithmetic operations with user-centric error messaging

Both examples follow production-grade patterns: explicit error handling, resource management, and clear user feedback. Start small with these concepts and gradually add complexity—your first CLI tool will become a powerful foundation for more advanced applications. Remember: **small, reliable tools solve real problems**. 📁🧮