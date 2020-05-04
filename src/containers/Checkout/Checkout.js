import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import {connect} from 'react-redux'
import ContactData from '../Checkout/ContactData/ContactData'
import {Route, Redirect} from 'react-router-dom'
//import * as actions from '../../store/actions/index'

class Checkout extends Component {
  // state = {
  //   ingredients: null,
  //   totalPrice: 0
  // };

  // componentWillMount() {
  //     console.log(this.props);
  //     const query = new URLSearchParams(this.props.location.search);
  //     const ingredients = {};
  //     let price = 0;
  //     for (let param of query.entries()){
  //         if(param[0] === 'price')
  //         {
  //           price = +param[1]
  //         }
  //         else {
  //           ingredients[param[0]] = +param[1];
  //         }
         
  //     }
  //     this.setState({ingredients: ingredients, totalPrice: price.toFixed(2)});
  // }

  // componentWillMount() {
  //   this.props.onInitPurchase();
  // }
  
  checkoutCancelledhandler = () => {
      this.props.history.goBack();
  }

  checkoutContinuedhandler = () => {
     this.props.history.replace('/checkout/contact-data');
  }

  render() {
    let summary = <Redirect to="/"/>

    if(this.props.ings)
    {
      const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null
      summary =(
        <div>
          {purchasedRedirect}
        <CheckoutSummary ingredients={this.props.ings} 
        onCheckoutCanceled={this.checkoutCancelledhandler}
        onCheckoutContinued={this.checkoutContinuedhandler}
        />
        <Route path={this.props.match.path + '/contact-data'} 
        component={ContactData} />
        </div>
      )
    }
    return summary;
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     onInitPurchase: () => dispatch(actions.purchaseInit())
//   }
// }

export default connect(mapStateToProps)(Checkout);
