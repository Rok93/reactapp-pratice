import React, {Component} from 'react';
import './App.css';
import TOC from './components/TOC'
import ReadContent from "./components/ReadContent";
import Subject from "./components/Subject";
import Control from "./components/Control";
import CreateContent from "./components/CreateContent";

class App extends Component {
    constructor(props) { //constructor가 가장먼저 실행되서 초기화가 진행된다!
        super(props); //render 함수보다 먼저 실행되면서, 그 컴포넌트를 초기화 시켜주고 싶은 코드는 Constructor 안에 코드 작성!
        this.max_content_id = 3;
        this.state = {
            mode: 'create', //todo: 임시로 변경 나중에 read로 바꾸기
            selected_content_id: 0,
            subject: {title: 'WEB', sub: 'World Wide Web!'},
            welcome: {title: 'Welcome', desc: 'Hello, React!!'},
            contents: [
                {id: 1, title: 'HTML', desc: 'HTML is for information'},
                {id: 2, title: 'CSS', desc: 'CSS is for design'},
                {id: 3, title: 'JavaScript', desc: 'JavaScript is for interactive'},
            ]
        }
    }

    render() { //props나 state 값이 바뀌면 해당되 component의 render 함수가 호출되도록 약속 되어 있다!
        console.log('App render');
        var _title, _desc, _article = null;
        if (this.state.mode === 'welcome') {
            _title = this.state.welcome.title;
            _desc = this.state.welcome.desc;
            _article = <ReadContent title={_title} desc={_desc}/>;
        } else if (this.state.mode === 'read') {
            for (let i = 0; i < this.state.contents.length; i++) {
                let data = this.state.contents[i];

                if (data.id === this.state.selected_content_id) {
                    _title = data.title;
                    _desc = data.desc;
                    break;
                }
            }
            _article = <ReadContent title={_title} desc={_desc}/>
        } else if (this.state.mode === "create") {
            _article = <CreateContent onSubmit={function (_title, _desc) {
                this.max_content_id++;
                let _contents = this.state.contents.concat({id: this.max_content_id, title: _title, desc: _desc});
                this.setState({
                    contents: _contents
                })
            }.bind(this)}/>
        }
        return (
            <div className="App">
                <Subject
                    title={this.state.subject.title}
                    sub={this.state.subject.sub}
                    onChangePage={function () {
                        this.setState({mode: 'welcome'});
                    }.bind(this)}
                >
                </Subject>
                <Control onChangeMode={function (_mode) {
                    this.setState({
                        mode: _mode
                    });
                }.bind(this)}/>
                <TOC
                    onChangePage={function (id) {
                        this.setState({
                            mode: 'read',
                            selected_content_id: Number(id)
                        })
                    }.bind(this)}
                    data={this.state.contents}
                />
                {_article}
            </div>
        );
    }
}

export default App;
