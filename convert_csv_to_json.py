import csv
import json

# Path to your CSV file
csv_file_path = 'worldcities.csv'
# Path where you want to save the JSON file
json_file_path = 'cities.json'

def convert_csv_to_json(csv_file_path, json_file_path):
    city_data = []

    try:
        # Try reading the CSV file with different encodings
        with open(csv_file_path, mode='r', encoding='latin1') as csv_file:
            csv_reader = csv.DictReader(csv_file)
            
            for row in csv_reader:
                city_data.append({
                    'name': row['city'],
                    'country': row['country']
                })

    except FileNotFoundError:
        print(f"Error: The file {csv_file_path} was not found.")
        return
    except UnicodeDecodeError:
        print(f"Error: Unable to decode the file with the given encoding.")
        return
    except Exception as e:
        print(f"An error occurred: {e}")
        return

    try:
        with open(json_file_path, mode='w', encoding='utf-8') as json_file:
            json.dump(city_data, json_file, indent=4)
        print(f"Successfully converted CSV to JSON. File saved as {json_file_path}.")
    except Exception as e:
        print(f"An error occurred while saving JSON file: {e}")

if __name__ == "__main__":
    convert_csv_to_json(csv_file_path, json_file_path)
