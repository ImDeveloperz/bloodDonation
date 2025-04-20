# Use official Python 3.13.3 slim image
FROM python:3.13.3-slim

# Set working directory
WORKDIR /app

# Copy just requirements first (to leverage Docker layer caching)
COPY requirements.txt .

# Install dependencies with custom cache directory
RUN pip install --no-cache-dir --cache-dir=/tmp/pip-cache -r requirements.txt

# Copy application code
COPY . .

# Expose the app port
EXPOSE 8000

# Start the API
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
