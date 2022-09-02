import React from 'react';
import NotesCard from './NotesCard';

import './main.css'

class MainPage extends React.Component{
    constructor(){
        super();
        this.state = {
            notesArray : [
                {
                    title: "My Goals 1",
                    message: "My Goals description",
                    color: ""
                },
                {
                    title: "My Goals 2",
                    message: "My Goals description",
                },
                {
                    title: "My Goals 3",
                    message: "My Goals description",
                },
                {
                    title: "My Goals 4",
                    message: "My Goals description",
                },
                {
                    title: "My Goals 5",
                    message: "My Goals description",
                },
                {
                    title: "My Goals 6",
                    message: "My Goals description",
                },
                {
                    title: "My Goals 7",
                    message: "My Goals description",
                },
                {
                    title: "My Goals 8",
                    message: "My Goals description",
                },
            ],
            
        }
        this.color = ["#A2738C", "#B293A4", "#81799F", "#645C84"];
    }

    componentDidMount(){
        this.render()
    }

    render(){
        return (
            <>
                <ul className='gridContainer' >
                    {this.state.notesArray.map((note, index) => {
                        let color = []
                        
                        if(this.state.notesArray.length > 3){
                            color = this.color;
                            let colorOffset = this.color.slice(0).reverse();
                            for(let n = 0; n < Math.floor(this.state.notesArray.length/3); n++){
                                color = color.concat(colorOffset.slice(1, 4));
                                colorOffset = colorOffset.slice(0).reverse();
                            }
                        }else{
                             color = this.color;
                        }
                        
                        let {title, message} = note
                        return (
                            <NotesCard title={title} message = {message} color={color[index]} />
                        )
                    })}
                </ul>
            </>
        )
    }
}

export default MainPage;