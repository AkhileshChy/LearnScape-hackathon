from django.shortcuts import render
from . import funct
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt  # Use this for testing; consider removing in production
def get_input(request):
    if request.method == 'POST':
        try:
            # Decode the request body to a string and parse the JSON data
            body_unicode = request.body.decode('utf-8')  # Decode the request body
            body_data = json.loads(body_unicode)  # Parse JSON data
            
            # Get the input data safely
            user_input = body_data.get('input_data')  # This will extract 'input_data' from the JSON
            
            if user_input:
                # Process the input and return success response
                processed_data = funct.generate(user_input)  # Call your processing function
                return JsonResponse({'status': 'success', 'data': processed_data})
            else:
                return JsonResponse({'status': 'error', 'message': 'No input provided'}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({'status': 'error', 'message': 'Invalid JSON'}, status=400)
    
    # For GET requests, provide a simple message or form (optional)
    return JsonResponse({'message': 'Please send data using a POST request.'})
