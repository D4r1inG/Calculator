import React, { Component } from 'react'

export default class Calculator extends Component {

    state = {
        result: {
            displayValue: 0,
            history: '',
            historyStatus: false
        }
    }

    temp = ''
    error = false

    getValue = (item) => {
        let operation = this.state.result.displayValue.toString()
        if (operation === '0' || this.state.result.historyStatus || this.error) {
            if ((item.target.innerHTML === '+' || item.target.innerHTML === '-' || item.target.innerHTML === '*' || item.target.innerHTML === '/') && !this.error) {
                this.setState({
                    result: {
                        displayValue: operation + item.target.innerHTML,
                        history: this.temp
                    }
                })
            } else {
                this.setState({
                    result: {
                        displayValue: item.target.innerHTML,
                        history: this.temp
                    }
                })
                document.querySelector("#result").classList.remove('text-danger')
                this.error = false
            }
        } else {
            this.setState({
                result: {
                    displayValue: operation + item.target.innerHTML,
                    history: this.temp
                }
            })
        }
    }

    calculate = () => {
        let operation = this.state.result.displayValue.toString()
        if (document.querySelector("#result").innerHTML === '0' || this.error) {
            return
        }

        if ((operation.charAt(0) === '.' ||
             operation.charAt(0) === '*' ||
             operation.charAt(0) === '/') ||
                (operation.charAt(operation.length - 1) === '+' ||
                    operation.charAt(operation.length - 1) === '-' ||
                    operation.charAt(operation.length - 1) === '*' ||
                    operation.charAt(operation.length - 1) === '.' ||
                    operation.charAt(operation.length - 1) === '/')
        ) {
            this.setState({
                result: {
                    displayValue: 'Vui lòng nhập đúng ký tự !',
                }
            })
            document.querySelector("#result").classList.remove('text-success')
            document.querySelector("#result").classList.add('text-danger')
            this.error = true
        } else {
            let result = eval(operation)
            this.setState({
                result: {
                    displayValue: result,
                    history: this.state.result.displayValue,
                    historyStatus: true
                }
            })
            this.temp = this.state.result.displayValue;
            document.querySelector("#result").classList.add('text-success')
        }
    }

    clear = () => {
        if (document.querySelector("#result").innerHTML === '0') {
            document.querySelector("#result").classList.remove('text-success')
            document.querySelector("#history").innerHTML = ''
            return
        }
        this.setState({
            result: {
                displayValue: 0,
                historyStatus: false
            }
        })
        document.querySelector("#result").classList.remove('text-success')
        document.querySelector("#result").classList.remove('text-danger')
        document.querySelector("#history").innerHTML = ''
        this.temp = ''
        this.error = false
    }

    detele = () => {
        if (this.state.result.displayValue === 0) {
            return
        }

        if (this.error) {
            this.setState({
                result: {
                    displayValue: 0
                }
            })
            this.error = false
            document.querySelector("#result").classList.remove('text-danger')
            return
        }

        if (this.state.result.displayValue.length === 1) {
            this.setState({
                result: {
                    displayValue: 0
                }
            })
        } else {
            this.setState({
                result: {
                    displayValue: this.state.result.displayValue.toString().slice(0, this.state.result.displayValue.toString().length - 1),
                    history: this.temp
                }
            })
        }
    }

    render() {
        return (
            <div className='container border border-dark mt-5 p-3 rounded shadow ' style={{ width: '300px' }}>
                <div className='text-center mb-3' style={{ fontWeight: 'bold' }}>
                    My calculator
                </div>
                <div id='result-content' className='text-right rounded border border-dark px-1' style={{ minHeight: '50px', width: '100%' }}>
                    <p id='history' style={{ fontSize: '13px', margin: 0 }}>{this.state.result.history}</p>
                    <p id='result' style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>{this.state.result.displayValue}</p>
                </div>
                <div className='row mt-3 calculator-btn m-0'>

                    {/* row-0 */}

                    <div className='col-6 p-1 mt-1'>
                        <p className='text-center border border-dark rounded px-1 m-0' onClick={() => { this.clear() }} style={{ cursor: 'pointer', userSelect: 'none' }}>C</p>
                    </div>

                    <div className='col-3 p-1 mt-1'>
                        <p className='text-center border border-dark rounded px-1 m-0' onClick={() => { this.detele() }} style={{ cursor: 'pointer', userSelect: 'none' }}>Xóa</p>
                    </div>

                    <div className='col-3 p-1 mt-1'>
                        <p className='border border-dark text-center rounded px-1 m-0' onClick={(item) => { this.getValue(item) }} style={{ cursor: 'pointer', userSelect: 'none' }}>+</p>
                    </div>

                    {/* row-1 */}

                    <div className='col-3 p-1 mt-1'>
                        <p className='border border-dark text-center rounded px-1 m-0' onClick={(item) => { this.getValue(item) }} style={{ cursor: 'pointer', userSelect: 'none' }}>7</p>
                    </div>
                    <div className='col-3 p-1 mt-1'>
                        <p className='border border-dark text-center rounded px-1 m-0' onClick={(item) => { this.getValue(item) }} style={{ cursor: 'pointer', userSelect: 'none' }}>8</p>
                    </div>
                    <div className='col-3 p-1 mt-1'>
                        <p className='border border-dark text-center rounded px-1 m-0' onClick={(item) => { this.getValue(item) }} style={{ cursor: 'pointer', userSelect: 'none' }}>9</p>
                    </div>
                    <div className='col-3 p-1 mt-1'>
                        <p className='border border-dark text-center rounded px-1 m-0' onClick={(item) => { this.getValue(item) }} style={{ cursor: 'pointer', userSelect: 'none' }}>-</p>
                    </div>

                    {/* row-2 */}

                    <div className='col-3 p-1 mt-1'>
                        <p className='border border-dark text-center rounded px-1 m-0' onClick={(item) => { this.getValue(item) }} style={{ cursor: 'pointer', userSelect: 'none' }}>4</p>
                    </div>
                    <div className='col-3 p-1 mt-1'>
                        <p className='border border-dark text-center rounded px-1 m-0' onClick={(item) => { this.getValue(item) }} style={{ cursor: 'pointer', userSelect: 'none' }}>5</p>
                    </div>
                    <div className='col-3 p-1 mt-1'>
                        <p className='border border-dark text-center rounded px-1 m-0' onClick={(item) => { this.getValue(item) }} style={{ cursor: 'pointer', userSelect: 'none' }}>6</p>
                    </div>
                    <div className='col-3 p-1 mt-1'>
                        <p className='border border-dark text-center rounded px-1 m-0' onClick={(item) => { this.getValue(item) }} style={{ cursor: 'pointer', userSelect: 'none' }}>*</p>
                    </div>

                    {/* row-3 */}


                    <div className='col-3 p-1 mt-1'>
                        <p className='border border-dark text-center rounded px-1 m-0' onClick={(item) => { this.getValue(item) }} style={{ cursor: 'pointer', userSelect: 'none' }}>1</p>
                    </div>
                    <div className='col-3 p-1 mt-1'>
                        <p className='border border-dark text-center rounded px-1 m-0' onClick={(item) => { this.getValue(item) }} style={{ cursor: 'pointer', userSelect: 'none' }}>2</p>
                    </div>
                    <div className='col-3 p-1 mt-1'>
                        <p className='border border-dark text-center rounded px-1 m-0' onClick={(item) => { this.getValue(item) }} style={{ cursor: 'pointer', userSelect: 'none' }}>3</p>
                    </div>
                    <div className='col-3 p-1 mt-1'>
                        <p className='border border-dark text-center rounded px-1 m-0' onClick={(item) => { this.getValue(item) }} style={{ cursor: 'pointer', userSelect: 'none' }}>/</p>
                    </div>

                    {/* row-4 */}

                    <div className='col-6 p-1 mt-1'>
                        <p className='border border-dark text-center rounded px-1 m-0' onClick={(item) => { this.getValue(item) }} style={{ cursor: 'pointer', userSelect: 'none' }}>0</p>
                    </div>
                    <div className='col-3 p-1 mt-1'>
                        <p className='border border-dark text-center rounded px-1 m-0' onClick={(item) => { this.getValue(item) }} style={{ cursor: 'pointer', userSelect: 'none' }}>.</p>
                    </div>
                    <div className='col-3 p-1 mt-1'>
                        <p className='border border-light text-center rounded px-1 m-0 bg-success text-white' onClick={() => { this.calculate() }} style={{ cursor: 'pointer', userSelect: 'none' }}>=</p>
                    </div>
                </div>
            </div>
        )
    }
}
