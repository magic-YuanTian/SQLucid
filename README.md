
# SQLucid
This repo includes code for the UIST'24 paper: [**SQLucid: Grounding Natural Language Database Queries with Interactive Explanations**](https://dl.acm.org/doi/abs/10.1145/3654777.3676368)

# :globe_with_meridians: [Demo Website](http://44.211.226.67:3502/)

*(Version 2.0, based on ChatGPT)*


SQLucid is an interactive interface for SQL generation, based on three key features:
- (1) Editable step-by-step SQL explanations in natural
- (2) Intermediate query results
- (3) Visual correspondence

![SQLucid_UI](https://github.com/user-attachments/assets/faba7992-5793-490e-a0cf-0d45819163b9)


which bridges the gap between non-expert users and complex database querying processes.


The frontend is based on [React](https://react.dev/), and the backend is based on [Flask](https://flask.palletsprojects.com/en/3.0.x/) and another project named [STEPS](https://github.com/magic-YuanTian/STEPS).


## ✨ Implementation

This project offers two versions with different deployment approaches and requirements:

### V1 (Original Version)

The original version (V1) leverages 2 fine-tuned language models. The entire project folder is relatively large-sized (around 5GB) including 2 fine-tuned models and database files. 
Note that the repo lacks some large files. You can choose to clone files locally and manually deploy them. 

- Please refer to [STEPS](https://github.com/magic-YuanTian/STEPS) for more details on deployment. 

- You can download the entire project folder at [this link](https://purdue0-my.sharepoint.com/:u:/g/personal/tian211_purdue_edu/Ee2FCOD3QHtEiG6mEmZ2CtwBbk8x9hMRZ6d3aU6W3Xii_Q?e=XVWXYO)



### V2 (Latest Version)

To support a more lightweight and up-to-date implementation, the latest version is powered by ChatGPT with a polished UI. 

- You can download the entire project folder at [this link](https://purdue0-my.sharepoint.com/:u:/g/personal/tian211_purdue_edu/ESMZ-VgHhoFGuQl-w96EcSQBp1m0zqt6t3zVI8yiDaj14A?e=b0CTOR).

- Then you only need to implement your own OpenAI API at `openai_api.py`, where the `get_openai_response()` method takes a string prompt and returns a string response.



## 🚀 Quick Start
After you deploy the project folder, you should run the *frontend* and the *backend* in parallel.

First, start a terminal and run the following command:

```
cd frontend
PORT=3000 npm start
```

Second, start another terminal and run

```
python run.py
```

Finally, you can access SQLucid at `localhost:3000`


## ⚖️ License



This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.



## 📚 Citation

If you find this work helpful, please cite our paper:

```bibtex
@inproceedings{10.1145/3654777.3676368,
    author = {Tian, Yuan and Kummerfeld, Jonathan K. and Li, Toby Jia-Jun and Zhang, Tianyi},
    title = {SQLucid: Grounding Natural Language Database Queries with Interactive Explanations},
    year = {2024},
    isbn = {9798400706288},
    publisher = {Association for Computing Machinery},
    address = {New York, NY, USA},
    url = {https://doi.org/10.1145/3654777.3676368},
    doi = {10.1145/3654777.3676368},
    abstract = {Though recent advances in machine learning have led to significant improvements in natural language interfaces for databases, the accuracy and reliability of these systems remain limited, especially in high-stakes domains. This paper introduces SQLucid, a novel user interface that bridges the gap between non-expert users and complex database querying processes. SQLucid addresses existing limitations by integrating visual correspondence, intermediate query results, and editable step-by-step SQL explanations in natural language to facilitate user understanding and engagement. This unique blend of features empowers users to understand and refine SQL queries easily and precisely. Two user studies and one quantitative experiment were conducted to validate SQLucid’s effectiveness, showing significant improvement in task completion accuracy and user confidence compared to existing interfaces. Our code is available at https://github.com/magic-YuanTian/SQLucid.},
    booktitle = {Proceedings of the 37th Annual ACM Symposium on User Interface Software and Technology},
    articleno = {12},
    numpages = {20},
    keywords = {Databases, Explanations, Natural Language Interfaces},
    location = {Pittsburgh, PA, USA},
    series = {UIST '24}
}
```

-----

Please email tian211@purdue.edu for any questions. Thanks!
