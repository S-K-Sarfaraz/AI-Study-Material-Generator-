const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  // const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const apiKey = "AIzaSyAYprblAWRILO6ZcwHCC_-qXBeInOR66s4";
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  

    export const courseOutlineAIModel = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate a study material for Python for Interview and the level of difficulty will be Easy with summery of course, List of chapters, Topic list in each chapters all the results in JSON format"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"courseSummary\": \"This study material provides a foundational understanding of Python programming, sufficient for clearing easy-level interview questions.  It focuses on core concepts and practical application, emphasizing clarity and readability.\",\n  \"chapters\": [\n    {\n      \"chapterTitle\": \"Introduction to Python\",\n      \"topics\": [\n        \"What is Python?\",\n        \"Setting up your Python environment (installation, IDEs)\",\n        \"Basic Syntax (indentation, comments)\",\n        \"Running Python code (interpreter, scripts)\",\n        \"Data types: Integers, Floats, Strings, Booleans\",\n        \"Variables and Assignment\",\n        \"Basic input and output (print(), input())\"\n      ]\n    },\n    {\n      \"chapterTitle\": \"Operators and Expressions\",\n      \"topics\": [\n        \"Arithmetic operators (+, -, *, /, //, %, **)\",\n        \"Comparison operators (==, !=, >, <, >=, <=)\",\n        \"Logical operators (and, or, not)\",\n        \"Assignment operators (=, +=, -=, *=, /=)\",\n        \"Operator precedence\",\n        \"Type conversion (int(), float(), str(), bool())\"\n      ]\n    },\n    {\n      \"chapterTitle\": \"Control Flow\",\n      \"topics\": [\n        \"Conditional statements (if, elif, else)\",\n        \"Looping constructs (for, while)\",\n        \"Break and continue statements\",\n        \"Nested loops\"\n      ]\n    },\n    {\n      \"chapterTitle\": \"Data Structures\",\n      \"topics\": [\n        \"Lists: creation, indexing, slicing, methods (append, insert, remove, pop)\",\n        \"Tuples: creation, indexing, immutability\",\n        \"Strings: string manipulation (concatenation, slicing, methods)\",\n        \"Dictionaries: creation, accessing values, methods (keys(), values(), items())\"\n      ]\n    },\n    {\n      \"chapterTitle\": \"Functions\",\n      \"topics\": [\n        \"Defining functions\",\n        \"Function parameters and arguments\",\n        \"Return values\",\n        \"Function scope\",\n        \"Docstrings\"\n      ]\n    },\n    {\n      \"chapterTitle\": \"Basic File Handling\",\n      \"topics\": [\n        \"Opening and closing files\",\n        \"Reading from files\",\n        \"Writing to files\",\n        \"File modes ('r', 'w', 'a', 'x')\"\n      ]\n    },\n    {\n      \"chapterTitle\": \"Practice Problems\",\n      \"topics\":[\n        \"Simple coding exercises related to the above chapters.\",\n        \"Example interview questions and solutions.\"\n      ]\n    }\n  ]\n}\n```\n"},
          ],
        },
      ],
    });