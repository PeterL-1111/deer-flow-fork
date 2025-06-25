#!/usr/bin/env python3
"""
Simplified entry point script for the Unghost Agent project.
This version uses only standard library and minimal dependencies.
"""

import argparse
import json
import os
import sys
import time

try:
    from inquirerpy import inquirer
    from dotenv import load_dotenv
    
    # Load environment variables
    load_dotenv()
    
    # Simple built-in questions
    BUILT_IN_QUESTIONS = [
        "What factors are influencing AI adoption in healthcare?",
        "How does quantum computing impact cryptography?",
        "What are the latest developments in renewable energy technology?",
        "How is climate change affecting global agriculture?",
        "What are the ethical implications of artificial intelligence?",
    ]
    
    def run_simple_agent(question):
        """Simplified agent that just prints the question and a mock response."""
        print(f"\nResearching: {question}\n")
        print("=" * 80)
        print("Unghost Agent - Simplified Mode")
        print("=" * 80)
        print("\nThis is a simplified version of Unghost Agent.")
        print("The full version requires additional setup and dependencies.")
        print("\nTo use the complete version with all features:")
        print("1. Follow the setup instructions in README.md")
        print("2. Install all required dependencies")
        print("3. Configure your API keys in .env file")
        print("\nYour question was:")
        print(f"  \"{question}\"")
        print("\nIn the full version, Unghost Agent would:")
        print("1. Research this topic using AI and web search")
        print("2. Generate a comprehensive, personalized response")
        print("3. Provide citations and sources")
        print("\nCheck the documentation for more information on setting up the complete version.")
        print("=" * 80)
    
    def main():
        """Interactive mode with built-in questions."""
        parser = argparse.ArgumentParser(description="Run the Unghost Agent")
        parser.add_argument("query", nargs="*", help="The query to process")
        parser.add_argument("--interactive", action="store_true", help="Run in interactive mode with built-in questions")
        
        args = parser.parse_args()
        
        if args.interactive:
            # Select a question
            ask_own_option = "[Ask my own question]"
            initial_question = inquirer.select(
                message="What do you want to know?",
                choices=[ask_own_option] + BUILT_IN_QUESTIONS,
            ).execute()
            
            if initial_question == ask_own_option:
                initial_question = inquirer.text(
                    message="What do you want to know?",
                ).execute()
            
            run_simple_agent(initial_question)
        else:
            # Parse user input from command line arguments or user input
            if args.query:
                user_query = " ".join(args.query)
            else:
                user_query = input("Enter your query: ")
            
            run_simple_agent(user_query)
    
    if __name__ == "__main__":
        main()
        
except ImportError as e:
    print(f"Error: Missing required dependencies. {e}")
    print("Please install the required packages with: python -m pip install -r requirements-minimal.txt")
    sys.exit(1)
except Exception as e:
    print(f"Error: {e}")
    sys.exit(1)