
# SQLucid
This repo includes code for the UIST'24 paper: [**SQLucid: Grounding Natural Language Database Queries with Interactive Explanations**](https://arxiv.org/pdf/2409.06178)

SQLucid is an interactive interface for SQL generation, based on three key features:
- (1) Editable step-by-step SQL explanations in natural
- (2) Intermediate query results
- (3) Visual correspondence

![SQLucid_UI](https://github.com/user-attachments/assets/faba7992-5793-490e-a0cf-0d45819163b9)


which bridges the gap between non-expert users and complex database querying processes.


The frontend is based on [React](https://react.dev/), and the backend is based on [Flask](https://flask.palletsprojects.com/en/3.0.x/) and another project named [STEPS](https://github.com/magic-YuanTian/STEPS).

## How to set up the project
The entire project folder is large (around 5GB) including 2 pre-trained models and database files. The repo lacks some large files. You can choose to clone files locally and manually deploy them.

- For the frontend, you can run `npm install` (and other prompted missing packages) to install related packages under the frontend folder.

- For the backend, please use `pip install` for any missing packages. If you encounter any issues, please check the detailed environment [here](https://github.com/OhadRubin/SmBop). Furthermore, you need to use text-to-SQL and text-to-clause models used in [STEPS](https://github.com/magic-YuanTian/STEPS).


**Suggested option**: To save your time, you can directly download the entire project folder through [this link](https://purdue0-my.sharepoint.com/:u:/g/personal/tian211_purdue_edu/Ee2FCOD3QHtEiG6mEmZ2CtwBbk8x9hMRZ6d3aU6W3Xii_Q?e=XVWXYO)

## How to run
You should run the frontend and the backend in parallel.

First, start a terminal and run the following command:

```
cd SQLucid
cd frontend
```

Then, start another terminal and run

```
python3 run.py
```

Then, you can access SQLucid at `localhost:3000`


[**Demo website**](http://54.165.238.20:3500/)

*The demo website is in version 2.0 based on ChatGPT. We will release the code soon.*


**This repository is being updated**


Please email tian211@purdue.edu for any questions.


