import pandas as pd
from faker import Faker
import random

fake = Faker()

hobbies_list = ['reading', 'sports', 'music', 'cooking', 'traveling', 'photography', 'painting', 'gaming', 'hiking', 'movies']
political_orientation_list = ['liberal', 'conservative', 'moderate']

def generate_user_data(n):
    data = []
    for i in range(n):
        user = {
            'id': i,
            'name': fake.name(),
            'age': fake.random_int(min=18, max=65),
            'hobbies': random.sample(hobbies_list, k=random.randint(1, 5)),
            'political_orientation': random.choice(political_orientation_list)
        }
        data.append(user)
    
    return pd.DataFrame(data)


df = generate_user_data(1000)
df.to_csv('user_data.csv', index=False)
