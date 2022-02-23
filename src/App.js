import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import data from "./data.js";

function App() {
  let [post, post변경] = useState(data);
  let postCopy = [...data];
  let [input, input변경] = useState(false);
  return (
    <div className="App">
      <div className="black-nav">
        <div>개발 blog</div>
      </div>
      <div className="btn-mid">
        <button
          onClick={() => {
            let array = [...post];
            array.sort((a, b) => {
              return a.id - b.id;
            });
            console.log(array);
            return post변경(array);
          }}
        >
          정렬
        </button>
      </div>
      {post.map((item, i) => {
        return (
          <Upload post={item} key={i} post변경={post변경} postCopy={postCopy} />
        );
      })}
      <div className="publish">
        <input onChange={(e) => input변경(e.target.value)} />
        <button
          onClick={() => {
            let array = [...post];
            array.push({ title: input });
            console.log(array);
            post변경(array);
          }}
        >
          저장
        </button>
      </div>
    </div>
  );
}
function Modal(props) {
  return (
    <div className="modal">
      <h2>{props.title}</h2>
      <p>{props.post.date}</p>
      <p>{props.post.content}</p>
    </div>
  );
}
function Upload(props) {
  let [like, like변경] = useState([0]);
  let [inputData, inputData변경] = useState("");
  let [title, title변경] = useState("");
  let [click, click변경] = useState(false);
  if (title == "") {
    title변경(props.post.title);
  }
  return (
    <div
      className="list"
      onClick={() => {
        click변경(!click);
      }}
    >
      <h3>
        {title}

        <span
          onClick={() => {
            let array = [...like];
            console.log(array);
            array[0] = array[0] + 1;
            like변경(array);
          }}
        >
          😃{like}
        </span>
      </h3>
      <p>{props.post.content}</p>
      <p>{props.post.date}</p>
      <span>
        <button
          onClick={() => {
            return title변경(inputData);
          }}
        >
          제목 수정
        </button>
        <input
          onChange={(e) => {
            inputData변경(e.target.value);
          }}
        />
      </span>
      {click === true ? <Modal title={title} post={props.post} /> : null}

      <hr />
    </div>
  );
}
export default App;
