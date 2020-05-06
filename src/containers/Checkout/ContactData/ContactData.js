import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import {connect} from 'react-redux'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../../store/actions/index'
import { checkValidity } from '../../../shared/utility'


class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig:{
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig:{
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipcode: {
        elementType: 'input',
        elementConfig:{
          type: 'text',
          placeholder: 'ZipCode'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig:{
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig:{
          type: 'email',
          placeholder: 'Your Email'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig:{
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'}
          ]
        },
        value: 'fastest',
        validation: {},
        valid: true
      },
    },
    formIsValid: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
   
    const formData = {};
    for(let formIdentifier in this.state.orderForm)
    {
      formData[formIdentifier] = this.state.orderForm[formIdentifier].value;
    }
    const order = {
      ingredients: this.props.ings,
      price: this.props.price.toFixed(2),
      orderData: formData,
      userId: this.props.userId
    };

    this.props.onOrderBurger(order,this.props.token);
  //   axios
  //     .post("/orders.json", order)
  //     .then((response) => {
  //       this.setState({ loading: false });
  //       this.props.history.push("/");
  //     })
  //     .catch((error) => {
  //       this.setState({ loading: false });
  //     });
   };

  inputChangedHandler = (event, inputIndentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    }

    const updatedFormElement = {
      ...updatedOrderForm[inputIndentifier] 
    }
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid= checkValidity(updatedFormElement.value, updatedFormElement.validation)
    updatedFormElement.touched= true;
    updatedOrderForm[inputIndentifier] = updatedFormElement;
    let formIsValid = true;
    for(let inputIndentifier in updatedOrderForm){
      formIsValid = updatedOrderForm[inputIndentifier].valid && formIsValid
    }
    this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid})
  }

  render() {

    const formElementArray = [];
    for (let key in this.state.orderForm){
      formElementArray.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {/* <Input
          elementType="..." elementConfig="..." value="..."/> */}
          {formElementArray.map(
            formElement => (
              <Input 
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig= {formElement.config.elementConfig}
              value= {formElement.config.value} 
              invalid={!formElement.config.valid}
              shouldValidate={formElement.config.validation}
              touched={formElement.config.touched}
              changed={(event) => this.inputChangedHandler(event, formElement.id)}
              />
            )
          )}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
          Order
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData,token) => dispatch(actions.purchaseBurger(orderData,token))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler( ContactData, axios));
