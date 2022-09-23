# SolvPath
This project is an API service that interacts with GNews API.
Following API are available 

## Top News API
This API retrieves the top news results based on language. The API takes following parameters
* Number of articles to fetch -  max number can be 20
* Two letter language code. 

The articles returned are displayed in a interactive JSON format.


## Search News API
This API search news results based on keyword and language. The API takes following parameters
* Keyword to search for - The keyword can contain AND, OR and NOT operators to filter the search.
* Where to search in - Possible values can be title, content and  description
* Number of articles to fetch -  max number can be 20
* Two letter language code. 

The articles returned are displayed in a interactive JSON format.


#Installation Guide
* Download the code from https://github.com/azkakishwar/SolvPath
* Go to the SolvPath folder and run following commands
  * Install python3 using https://realpython.com/installing-python/
  * Run ```pip install -r requirements.txt  ```
  * Setup .env file using following steps
    * Create an .env file in SolvPath/SolvPath
    * Copy the contents of SolvPath/.env.example and paste then in your created .env file
    * Get API key for GNews API by registering at https://gnews.io/register. You can also use the API key mentioned in .env.example
    * Copy you SECRET_KEY from SolvPath/SolvPath/settings.py and paste it in .env
  * Run ``` python manage.py runserver```. The server will be running at http://127.0.0.1:8000/
  * Access the API service by using http://127.0.0.1:8000/gnews 

    

