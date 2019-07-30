import React, { Component } from 'react'

function MyTextInput(props){
  function handleChange(event){
    if (props.onChange) props.onChange(event)
  }
  return (
    <p>
      <input ref={props.inputRef} type='email' placeholder='input your email' name={props.name} value={props.value} onChange={handleChange}></input>
    </p>
  )
}

class MyInputBlockComponent1 extends Component {
  constructor(props){
    super(props)
    this.textInput = null
    this.setTextInputRef = element => { // 其實就是把inline的寫法拉出來一個function
      this.textInput = element
    }
    this.focusTextInput = () => {
      if (this.textInput) this.textInput.focus()
    }
  }

  handleChange = event => {
    if (this.props.onChange) this.props.onChange(event)
  }
  
  componentDidMount (){
    this.focusTextInput()
  }

  render () {
    return (
      <div>
        <p><input type='text' placeholder='MyInputBlockComponent input name' name={this.props.inputFullnameName} onChange={this.handleChange}></input></p>
        <p><textarea ref={this.setTextInputRef} placeholder='MyInputBlockComponent Content' name={this.props.inputContentName} onChange={this.handleChange}></textarea></p>
        <p><textarea ref={this.props.inputRef} placeholder='MyInputBlockComponent Content 2' name='other name' onChange={this.handleChange}></textarea></p>
      </div>
      )
  }
}

class MyInputBlockComponent extends Component {
  constructor(props){
    super(props)
    this.focusTextInput = () => {
      this.props.inputRef.current.focus()
    }
  }

  handleChange = event => {
    if (this.props.onChange) this.props.onChange(event)
  }
 
  componentDidMount (){
    this.focusTextInput()
  }

  componentDidUpdate (){
    this.focusTextInput()
  }

  render () {
    return (
      <div>
        <p><textarea ref={this.props.inputRef} placeholder='Enter your Note' name={this.props.inputContentName} onChange={this.handleChange}></textarea></p>
      </div>
      )
  }
}

class FormsAndInputs extends Component {

  constructor(props){
    super(props)
    this.state = ({
      myFullName: null,
      email: null,
      MyInputBlockComponent_Content: null
    })
    this.inputFullNameRef = React.createRef()
    this.inputEmailRef = React.createRef()
    this.inputTextAreaRef = React.createRef()

  }

  handleSubmit = (event) => {
    event.preventDefault()
    const data = this.state
    console.log(data)
  }

  handleInputChange = (event) => {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleFocusClick = (event) => {
    event.preventDefault()
    //this.inputContnetRef.focus()
    this.inputEmailRef.current.focus()
  }

  handleClearClick = (event) => {
    event.preventDefault()
    this.inputFullNameRef.current.value = ''
    this.inputEmailRef.current.value = ''
    this.inputContnetRef.value = ''
    this.inputTextAreaRef.current.value = ''
    this.setState({
      myFullName: ''
    })
  }

  componentDidMount () {
    this.setState({
      myFullName: 'Charles Chung',
      email: '23@gmail.com'
    })
  }

  render () {
    const {myFullName} = this.state
    const {email} = this.state
    const {MyInputBlockComponent_Content} = this.state
    return (
      <div>
        <h1>Forms and Inputs</h1>
        <p>Your full name is: {myFullName}</p>
        <p>Your email is: {email}</p>
        <p>Your content is: {MyInputBlockComponent_Content}</p>
        <form onSubmit={this.handleSubmit}>
          <MyTextInput name='email' inputRef={this.inputEmailRef} onChange={this.handleInputChange}/>
          <MyInputBlockComponent inputRef={this.inputTextAreaRef} onChange={this.handleInputChange} inputFullnameName='myFullName' inputContentName='MyInputBlockComponent_Content'/>
          <p><input ref={this.inputFullNameRef} type='text' placeholder='input your name' name='myFullName' onChange={this.handleInputChange}></input></p>
          <p><button>Send Message</button></p>
          <p><textarea ref={node => this.inputContnetRef = node} placeholder='input your content' name='content' onChange={this.handleInputChange}></textarea></p>
          <p><button onClick={this.handleFocusClick}>Focus</button></p>
          <p><button onClick={this.handleClearClick}>Clear</button></p>
        </form>
      </div>
    )
  }


}

export {MyInputBlockComponent}
export default FormsAndInputs