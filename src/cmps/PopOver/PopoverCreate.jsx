import { closePopover } from "../../store/actions/app.actions";
import { ScreenOverlay } from "../ScreenOverlay";
import {connect} from 'react-redux'
class _PopoverCreate extends Componenet {

    state={
        title:'',
        background:''
    }
    componentDidMount(){
        this.setState({background:'#0079bf'})
    }

    render(){
        const {title,background}=this.state
        const {closePopover}=this.props
        return <ScreenOverlay goBack={closePopover} styleMode="darken">
            <div className="create-board-popover">
            <div className="board-preview" style={{background:background}}>
                <input type="text" value={title} onChange={this.handleChange} />
            </div>
            <div className="create-preview-colors">
                
            </div>
            </div>
        </ScreenOverlay>
       
    }
}
const  mapDispatchToProps={
    closePopover
}
const PopoverCreate=connect(null,mapDispatchToProps)(_PopoverCreate)