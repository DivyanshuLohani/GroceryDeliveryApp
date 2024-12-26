import json
import os
import requests
import cuid


def clean_data():
    print("Clean Data")
    with open("data.json") as f:
        content = json.load(f)['log']['entries']

    new = []

    for i in content:
        if "https://blinkit.com/v2/listing" in i['request']['url']:
            if (
                i['response']['status'] == 200 and
                i['response']['content']['mimeType'] == "application/json"
            ):
                c = json.loads(i['response']['content']['text'])
                d = c['prefetch']['with_data']
                new.extend(d[list(d.keys())[0]]['objects'])

    with open("cleaned.json", "w") as f:
        json.dump(new, f, indent=4)


def get_product_info():
    with open("cleaned.json") as f:
        content = json.load(f)

    d = []
    seen = set()
    for i in content:
        try:
            data = i['data']['product']
        except:
            continue
        if data['product_id'] in seen:
            continue
        seen.add(data['product_id'])
        data = i['data']['product']
        name = data['name']
        price = data['price']
        barnd = data['brand']
        images = data['images']
        discount = data['discount']
        type_id = data['type_id']
        category = data['leaf_category']
        d.append({
            "id": data['product_id'],
            "name": name,
            "price": price,
            "barnd": barnd,
            "discount": discount,
            "images": images,
            "type_id": type_id,
            "category": category
        })

    with open("final.json", "w") as w:
        json.dump(d, w, indent=4)


def get_images():

    with open("final.json") as f:
        content = json.load(f)

    for i in content:
        images = i['images']
        os.mkdir(f"products/{i['id']}")
        for j in images:
            data = requests.get(j)
            with open(f"products/{i['id']}/" + cuid.cuid() + ".jpg", "wb") as w:
                w.write(data.content)


# # clean_data()
# get_product_info()
# # get_images()
