const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
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

    export const GenerateNotesAIModel = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate exam material detail content for each chapter, Make sure to include all the topic point in the content make sure to give content in HTML format (do not Add HTML, Head, Body, Title tag) The chapter:\n{\n      \"chapterTitle\": \"React Native Fundamentals\",\n      \"topics\": [\n        \"Setting up development environment\",\n        \"JSX and Components\",\n        \"Props and State\",\n        \"Styling with StyleSheet\",\n        \"Common Components (View, Text, Image, ScrollView)\",\n        \"Working with different platform-specific components\",\n        \"Understanding lifecycle methods\"\n      ]\n    },"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```html\n<h3>Chapter: React Native Fundamentals</h3>\n\n<h4>1. Setting up Development Environment</h4>\n<p>This section covers the essential steps to set up your development environment for React Native.  Topics include:</p>\n<ul>\n  <li>Installing Node.js and npm (or yarn).</li>\n  <li>Setting up the Android SDK (if developing for Android).</li>\n  <li>Setting up the iOS SDK (if developing for iOS).</li>\n  <li>Installing the React Native CLI.</li>\n  <li>Creating a new React Native project using the CLI.</li>\n  <li>Running the project on an emulator or physical device.</li>\n  <li>Troubleshooting common setup issues.</li>\n</ul>\n\n<h4>2. JSX and Components</h4>\n<p>This section introduces JSX, the syntax extension to JavaScript, and how it's used to build React Native components.  Topics include:</p>\n<ul>\n  <li>Understanding JSX syntax and its benefits.</li>\n  <li>Creating functional and class components.</li>\n  <li>Using JSX to render UI elements.</li>\n  <li>Working with component hierarchies.</li>\n  <li>Passing data between components.</li>\n</ul>\n\n<h4>3. Props and State</h4>\n<p>This section explains how to manage data within React Native components using props and state.  Topics include:</p>\n<ul>\n  <li>Understanding the difference between props and state.</li>\n  <li>Passing data to components using props.</li>\n  <li>Updating the UI using state.</li>\n  <li>Using `setState` to update state and trigger re-renders.</li>\n  <li>Working with different data types in state.</li>\n  <li>Handling events that modify state.</li>\n</ul>\n\n<h4>4. Styling with StyleSheet</h4>\n<p>This section covers the process of styling React Native components using the `StyleSheet` API. Topics include:</p>\n<ul>\n  <li>Creating styles using `StyleSheet.create`.</li>\n  <li>Using different style properties (e.g., `flex`, `flexDirection`, `padding`, `margin`).</li>\n  <li>Applying styles to components.</li>\n  <li>Using style inheritance.</li>\n  <li>Understanding flexbox layout in React Native.</li>\n  <li>Creating responsive layouts.</li>\n</ul>\n\n<h4>5. Common Components (View, Text, Image, ScrollView)</h4>\n<p>This section details the usage of frequently used core components in React Native.  Topics include:</p>\n<ul>\n  <li>Understanding the `View` component and its role as a container.</li>\n  <li>Rendering text using the `Text` component.</li>\n  <li>Displaying images using the `Image` component.</li>\n  <li>Enabling scrollable content with the `ScrollView` component.</li>\n  <li>Working with props for each of these components.</li>\n</ul>\n\n<h4>6. Working with Different Platform-Specific Components</h4>\n<p>This section explores how to create platform-specific UI experiences using React Native. Topics include:</p>\n<ul>\n  <li>Using platform-specific styles with `Platform.OS`.</li>\n  <li>Importing platform-specific components.</li>\n  <li>Creating conditional rendering based on platform.</li>\n  <li>Understanding the benefits of platform-specific UI.</li>\n</ul>\n\n<h4>7. Understanding Lifecycle Methods</h4>\n<p>This section covers the lifecycle methods of React Native components and how to utilize them.  Topics include:</p>\n<ul>\n  <li>Explanation of the component lifecycle stages.</li>\n  <li>Key lifecycle methods (e.g., `componentDidMount`, `componentWillUnmount`, `componentDidUpdate`).</li>\n  <li>Performing actions at different lifecycle stages.</li>\n  <li>Managing resources and cleanup tasks.</li>\n  <li>Differences in lifecycle methods between functional and class components.</li>\n\n</ul>\n```\n"},
          ],
        },
      ],
    });