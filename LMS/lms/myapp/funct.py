from groq import Groq , RateLimitError
import json



def generate(input):

    client = Groq(api_key="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")

    system_prompt = """You are given a dictionary of questions and answer selected by the user which are marked incorrect from the main topic DSA.
    Analyze the sub-topics in which user is lagging and generate 10 questions based on those topics to generate relevant questions and answers
    to help th user learn the topic.

    # JSON format to generate questions and adhere to it with no extra content.
    {
        "topic": "DSA",
        "questions": [
            {
                "question_id": "1",
                "type": "mcq",
                "difficulty": "easy",
                "question": "What is the time complexity of accessing an element in an array by index?",
                "options": [
                    "O(1)",
                    "O(n)",
                    "O(log n)",
                    "O(n^2)"
                ],
                "answer": "O(1)",
                "explanation": "Arrays allow direct access to elements using their index, resulting in constant time complexity, O(1)."
            },
    }

    """

    chat_completion = client.chat.completions.create(
                        messages=[
                            {"role": "system", "content": system_prompt},
                            {"role": "user", "content": f"Generate 10 questions from {input}"}
                        ],
                        model="llama3-70b-8192",
                        temperature=0.1
                    )
    
    with open("ans.txt" , "w" , encoding='utf-8') as fx:
        fx.write(chat_completion.choices[0].message.content)
    
    return extract_and_write_json(chat_completion.choices[0].message.content)



def extract_and_write_json(text):
    try:
        # Identify the start and end of the JSON content
        start = text.find("{")
        end = text.rfind("}") + 1

        # Check if any JSON content was found
        if start == -1 or end == -1 or start >= end:
            raise ValueError("No valid JSON found in the text.")

        # Extract the JSON string from the text
        json_string = text[start:end]
        print(json_string)
        # Convert the JSON string to a Python dictionary
        json_data = json.loads(json_string)

        
        return json_data
    
    except json.JSONDecodeError:
        print("Error: Failed to decode JSON. Please check the JSON format.")
        return None
    except ValueError as ve:
        print(f"ValueError: {ve}")
        return None
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return None