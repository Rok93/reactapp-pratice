import React, {Component} from "react";

class Subject extends Component {
    render() { // 반드시 render 함수가 있어야 한다! class 안에 소속된 함수는 function을 생략한다!
        console.log('Subject render');
        return ( // 컴포넌트는 반드시 하나의 최상위 태그가 존재해야 한다.
            <header>
                <h1><a href="/" onClick={function (e) {
                    e.preventDefault();
                    this.props.onChangePage();
                }.bind(this)}>{this.props.title}</a></h1>
                {this.props.sub}
            </header>
        );
    }
}

export default Subject;