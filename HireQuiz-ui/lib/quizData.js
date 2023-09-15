// pages\quizData.js
// Created by: Pratham
// Last Updated by: Pratham on 03/08/2023

const quizArray = [
  
        {
            id: "0",
            question: "What is the range of values that can be stored by int datatype in C?",
            options: [
              { text: "-(2^31) to (2^31)-1", status: "" },
              { text: "-256 to 255", status: "" },
              { text: "-(2^63) to (2^63)-1", status: "" },
              { text: "0 to (2^31)-1", status: "" },
            ],
            correct: 4,
          },
          {
            id: "1",
            question: "What is the 16-bit compiler allowable range for integer constants?",
            options: [
              { text: "-3.4e38 to 3.4e38", status: "" },
              { text: "-32767 to 32768", status: "" },
              { text: "-32668 to 32667", status: "" },
              { text: "-32768 to 32767", status: "" },
            ],
            correct: 4,
          },
          {
            id: "2",
            question: "What is required in each C program?",
            options: [
              { text: "The program must have at least one function.", status: "" },
              { text: "The program does not require any function.", status: "" },
              { text: "Input data", status: "" },
              { text: "Output data", status: "" },
            ],
            correct: 1,
          },
          {
            id: "3",
            question: "What is a lint?",
            options: [
              { text: "C compiler", status: "" },
              { text: "Interactive debugger", status: "" },
              { text: "Analyzing tool", status: "" },
              { text: "C interpreter", status: "" },
            ],
            correct: 3,
          },
          {
            id: "4",
            question: "In the C language, the constant is defined _.",
            options: [
              { text: "Before main", status: "" },
              { text: "After main", status: "" },
              { text: "Anywhere, but starting on a new line.", status: "" },
              { text: "None of the these.", status: "" },
            ],
            correct: 3,
          },
          {
            id: "5",
            question: "What does 'int x : 4;' declaration mean?",
            options: [
              { text: "X is a four-digit integer.", status: "" },
              { text: "X cannot be greater than a four-digit integer.", status: "" },
              { text: "X is a four-bit integer.", status: "" },
              { text: "None of the these", status: "" },
            ],
            correct: 3,
          },
          {
            id: "6",
            question: "Why is a macro used in place of a function?",
            options: [
              { text: "It reduces execution time.", status: "" },
              { text: "It reduces code size.", status: "" },
              { text: "It increases execution time.", status: "" },
              { text: "It increases code size.", status: "" },
            ],
            correct: 4,
          },
          {
            id: "7",
            question: "How many times will the for(j = 1; j <= 10; j = j-1) loop execute?",
            options: [
              { text: "Forever", status: "" },
              { text: "Never", status: "" },
              { text: "0", status: "" },
              { text: "1", status: "" },
            ],
            correct: 1,
          },
          {
            id: "8",
            question: "A pointer is a memory address. Suppose the pointer variable has p address 1000, and that p is declared to have type int*, and an int is 4 bytes long. What address is represented by expression p + 2?",
            options: [
              { text: "1002", status: "" },
              { text: "1004", status: "" },
              { text: "1006", status: "" },
              { text: "1008", status: "" },
            ],
            correct: 4,
          },
          {
            id: "9",
            question: "Which one of the following is a loop construct that will always be executed once?",
            options: [
              { text: "for", status: "" },
              { text: "while", status: "" },
              { text: "switch", status: "" },
              { text: "do while", status: "" },
            ],
            correct: 2,
          },
          {
            id: "10",
            question: "How many characters can a string hold when declared as char name[20];",
            options: [
              { text: "18", status: "" },
              { text: "19", status: "" },
              { text: "20", status: "" },
              { text: "None of these", status: "" },
            ],
            correct: 2,
          },
          {
            id: "11",
            question: "Directives are translated by the",
            options: [
              { text: "Pre-processor", status: "" },
              { text: "Compiler", status: "" },
              { text: "Linker", status: "" },
              { text: "Editor", status: "" },
            ],
            correct: 1,
          },
  
          
    // Add more questions here...
  ];
  
  export default quizArray;
  