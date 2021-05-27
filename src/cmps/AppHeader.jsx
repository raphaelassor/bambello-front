import { Component } from "react";
import { Link } from 'react-router-dom'
import {ReactComponent as HomeIcon } from '../assets/img/icons/home.svg'
import {ReactComponent as BoardIcon} from '../assets/img/icons/board.svg'
import {ReactComponent as AppsIcon} from '../assets/img/icons/apps.svg'
import {ReactComponent as SearchIcon} from '../assets/img/icons/search.svg'
import {ReactComponent as AddIcon} from '../assets/img/icons/add.svg'
import {ReactComponent as InfoIcon} from '../assets/img/icons/info.svg'
import {ReactComponent as BellIcon} from '../assets/img/icons/notific-bell.svg'
import Avatar from '@material-ui/core/Avatar';
export class AppHeader extends Component{
 
    state={
        filterTxt:'',
        currOpenModal:'',
        isPrevInput:true,
        isNewNotific:false,
    }

    toggleInput=()=>{
        this.setState({isPrevInput:!this.state.isPrevInput ,currOpenModal:!this.state.isPrevInput? '':'search' })
    }
    
    toggleCurModal=(modalName='')=>{
        if(this.state.currOpenModal=== modalName) this.setState({currOpenModal:''})
        else this.setState({currOpenModal:modalName})
    }
    
    render(){
        const{isPrevInput,currOpenModal}=this.state
        return <div className="main-header flex justify-space-between">
            <div className="btn-header-container flex">
                <button className="btn-header">
                <AppsIcon/>
                </button>
                <button className="btn-header">
                <HomeIcon/>
                </button>
                <button className="btn-header flex" onClick={()=>this.toggleCurModal('board-search')}> 
                <BoardIcon/>
                <span>
                    Boards
                {currOpenModal==='board-search'&& <div className="header-modal board-search">
                <input type="text" name="" id=""/>
                    {/* <BoardList boards={FilteredBoards}/> */}
                </div> }
                </span>
                </button>
                <div className={`input-header-wrapper flex ${!isPrevInput&&'extended-input'}`} >
                <input type="text" className="input-header" placeholder="Jump to..." onFocus={this.toggleInput} onBlur={this.toggleInput}/>
                <SearchIcon/>
                {currOpenModal==='search'&& <div className=" header-modal search-all">
                    SEARCH PLACEHOLDER
                </div> }
                </div>
            </div>
            <div className="logo flex align-center">
                <Link to="/">
                    <BoardIcon/>
                    <span>Bambello</span>
                </Link>
            </div>
            <div className="btn-header-container flex">
                <div>
                <button className="btn-header" onClick={()=>this.toggleCurModal('create')}>
                    <AddIcon/>
                </button>
                {currOpenModal==='create' &&  <div className=" header-modal create-modal">
                    {/* <CreateModal/> */}
                    CREATE PLACEHOLDER
                </div>}
                </div>
                <button className="btn-header" onClick={()=>this.toggleCurModal('info')}>
                    <InfoIcon/>
                </button>
                <div>
                <button className="btn-header" onClick={()=>this.toggleCurModal('notifics')}>
                    <BellIcon/>
                </button>
                {currOpenModal==='notifics' && 
                <div className="header-modal notific-modal">
                    {/* <NotificsList activities={this.props.activities} /> */}
                    NOTIFICATIONS  PLACEHOLDER
                </div> }
                </div>
                    <Avatar onClick={()=>this.toggleCurModal('user')}  style={{backgroundColor:'#DFE1E6',color:'#172b4d',width:'32px',height:'32px',fontWeight:'bold',fontSize:'14px'}}>RA</Avatar>
                    {currOpenModal==='user' && 
                <div className="header-modal notific-modal">
                    {/* <NotificsList activities={this.props.activities} /> */}
                    USER NAV  PLACEHOLDER
                </div> }
            </div>
        </div>
    }

}