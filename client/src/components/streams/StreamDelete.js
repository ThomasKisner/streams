import React from 'react'; 
import {Component} from 'react'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Modal from './Modal' 
import history from '../../history';
import {deleteStream, fetchStream} from '../../actions';

class StreamDelete extends Component{
    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id)
    }

    renderActions(){ 
        const {id} = this.props.match.params;
        return (
        <>
               <button className="ui button negative" onClick={()=> this.props.deleteStream(id)}>Delete</button>
               <Link className="ui button" to='/'>Cancel</Link>
           </>
        )
       }

    renderContent(){
        if(!this.props.stream){
            return 'Are you sure you want to delete this stream'
        } else {
            return `Are you sure you want to delete the stream with title: ${this.props.stream.title}`
        }
    }
  

 render(){
    return(
            <Modal header="Delete Stream" content={this.renderContent()} actions={this.renderActions()} onDismiss={()=> history.push('/')}/>
        
    )
}
}

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps, {deleteStream, fetchStream})(StreamDelete);