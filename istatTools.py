import pandas as pd
import requests
import json

url_base = "http://sdmx.istat.it/SDMXWS/rest/"
decoding = "utf-8-sig"

def get_available(dataflow_name:str=None, first:int=-1) -> pd.DataFrame:
    url = f"{url_base}dataflow?format=jsonstructure"
    response = requests.get(url)

    if response.status_code != 200:
        print(f"Failed to retrieve dataflows, status code: {response.status_code}")
        return
    
    content = response.content.decode(decoding)
    dataflows = json.loads(content).get('data', {}).get('dataflows', [])
    filtered_data = []

    for df in dataflows[:first]:
        name = df.get('name', {}).get('en', '')
        if not dataflow_name or dataflow_name.lower() in name.lower():
            filtered_data.append({
                'ID': df.get('id', ''),
                'Name': name,
                'Version': df.get('version', ''),
                'Agency': df.get('agencyID', '')
            })
    
    dataflows_df = pd.DataFrame(filtered_data)
    print(dataflows_df)


def search_by_id(dataflow_id:str, startPeriod:int, endPeriod:int, dict:bool=True):
    data_url = f"{url_base}data/{dataflow_id}?startPeriod={startPeriod}&endPeriod={endPeriod}&format=jsondata"
    response = requests.get(data_url)

    if response.status_code != 200:
        print(f"Failed to retrieve dataflows, status code: {response.status_code}")
        return
    
    content = response.content.decode(decoding)
    data = json.loads(content)
    series_data = data['data']['dataSets'][0]['series']
    structure = data['data']['structure']
    series_dimensions = structure['dimensions']['series']
    observation_dimension = structure['dimensions']['observation'][0]

    data_dict = {value['id']: value['name']['en'] for dim in series_dimensions for value in dim['values']}
    time_map = {str(i): val['id'] for i, val in enumerate(observation_dimension['values'])}
    dim_ids = [dim['id'] for dim in series_dimensions]
    dim_value_maps = [
        {str(i): val['id'] for i, val in enumerate(dim['values'])}
        for dim in series_dimensions
    ]

    records = []

    for series_key, series in series_data.items():
        dim_indices = series_key.split(':')

        dim_values = {
            dim_ids[i]: dim_value_maps[i].get(dim_indices[i], f"unknown_{dim_indices[i]}")
            for i in range(len(dim_indices))
        }

        for obs_index, obs_value in series['observations'].items():
            value = obs_value[0] if obs_value else None
            time_period = time_map.get(obs_index, f"unknown_{obs_index}")

            record = {
                **dim_values,
                'period': time_period,
                'value': value
            }
        records.append(record)

    df = pd.DataFrame(records)

    return data_dict, df if dict else df