import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import Header from "./header.js";
import InputAndBtn from "./InputAndBtn.js";
import myApi from '../../myApi.js';
import axios from 'axios';


// THIS APP IS FOR PRIVATE USE ONLY . 
// PLEASE DO NOT SHARE OR SUBMIT TO APP STORE AS THIS WILL EXPOSE YOUR API KEY/SECRET . 










class SearchBooks extends React.Component {
  state = {
    product_name: '',
    product_id: '',
    product_sku: '',
    product_status: '',
    product_author: '',
    product_regular_price: '',
    product_stock_quantity: '',
    author_keywords: '',
    product_keywords: '',
    keywords_or_author_search_result_array: [],
    search_status: 'please enter to search',
  }




  search_by_sku = () => {
    this.setState({
      search_status: 'searching now...',
      product_id: '',
      author_keywords: '',
      product_author: '',
      product_keywords: ''

    })

    axios({
      method: 'get',
      url: `${myApi.website}/products?sku=${this.state.product_sku}`,
      auth: {
        username: myApi.key,
        password: myApi.secret
      }
    }).then((res) => {


      if (res.status === 200 && res.data.length !== 0) {
        const book = res.data[0];
        this.setState({
          search_status: 'success',
          product_name: book.name,
          product_author: book.attributes[0].options[0],
          product_id: book.id,
          product_sku: book.sku,
          product_status: book.status,
          product_regular_price: book.regular_price,
          product_stock_quantity: book.stock_quantity
        })
        console.log(this.state);
      } else if (res.status === 200 && res.data.length === 0) {
        this.setState({
          search_status: 'item not in databse'
        })
      } else if (res.status !== 200) {
        this.setState({
          search_status: res.status
        })
      }

    }).catch(error => {
      console.log(error);
      this.setState({
        search_status: `${error}`
      })
    })
  }



  search_by_id = () => {
    this.setState({
      search_status: 'searching now...',
      author_keywords: '',
      product_author: '',
      product_keywords: '',
      product_sku: ''
    })
    axios({
      method: 'get',
      url: `${myApi.website}/products/${this.state.product_id}`,
      auth: {
        username: myApi.key,
        password: myApi.secret
      }
    }).then((res, err) => {
      if (res.status === 200) {
        const book = res.data;
        this.setState({
          search_status: 'success',
          product_name: book.name,
          product_author: book.attributes[0].options[0],
          product_id: book.id,
          product_sku: book.sku,
          product_status: book.status,
          product_regular_price: book.regular_price,
          product_stock_quantity: book.stock_quantity
        })
        console.log(this.state);
      } else if (res.status === 200 && res.data.length === 0) {
        this.setState({
          search_status: 'item not in databse'
        })
      } else {
        this.setState({
          search_status: res.status
        })
      }
    }).catch(error => {
      this.setState({
        search_status: `${error}`
      })
    });
  }




  search_by_author = () => {
    this.setState({
      search_status: 'searching now...',
      product_id: '',
      product_keywords: '',
      product_sku: ''
    })

    axios({
      method: 'get',
      url: `${myApi.website}/products?search=${this.state.author_keywords}&per_page=100`,
      auth: {
        username: myApi.key,
        password: myApi.secret
      }
    }).then((res) => {
      if (res.status === 200 && res.data.length !== 0) {
        const book_array = res.data;
        console.log('book_array', book_array);
        const filtered_array = book_array.filter(el => el.attributes[0].options[0].includes(this.state.author_keywords));
        console.log('filtered_array', filtered_array);
        if (filtered_array !== 0) {
          this.setState({
            search_status: 'Success,this author has following book(s)',
            keywords_or_author_search_result_array: filtered_array
          })
        } else {
          this.setState({
            search_status: 'please refine your search keywords'
          })
        }
      } else if (res.status === 200 && res.data.length === 0) {
        this.setState({
          search_status: 'item not in databse'
        })
      } else if (res.status !== 200) {
        this.setState({
          search_status: res.status
        })
      }

    }).catch(error => {
      this.setState({
        search_status: `${error}`
      })
    });
  }


  search_by_keywords = () => {
    this.setState({
      search_status: 'searching now...',
      author_keywords: '',
      product_id: '',
      product_sku: ''
    })

    axios({
      method: 'get',
      url: `${myApi.website}/products?search=${this.state.product_keywords}&per_page=100`,
      auth: {
        username: myApi.key,
        password: myApi.secret
      }
    }).then((res) => {
      if (res.status === 200 && res.data.length !== 0) {
        console.log(res);
        const book_array = res.data;
        console.log('book_array', book_array);
        const filtered_array = book_array.filter(el => el.name.includes(this.state.product_keywords));
        console.log('filtered_array', filtered_array);
        if (filtered_array.length !== 0) {
          this.setState({
            search_status: 'Success,following book(s) contain searched keywords in their titles',
            keywords_or_author_search_result_array: filtered_array
          })
        } else {
          this.setState({
            search_status: 'please refine your search keywords'
          })
        }
      }

      else if (res.status === 200 && res.data.length === 0) {
        this.setState({
          search_status: 'item not in databse'
        })
      } else if (res.status !== 200) {
        this.setState({
          search_status: res.status
        })
      }

    }).catch(error => {
      this.setState({
        search_status: `${error}`
      })
    });
  }


  onInputIdChange = (product_id) => {
    this.setState({ product_id: product_id });
  }

  onInputSkuChange = (product_sku) => {
    this.setState({ product_sku: product_sku });
  }

  onInputAuthorChange = (author_keywords) => {
    this.setState({ author_keywords: author_keywords });
  }

  onInputKeywordsChange = (product_keywords) => {
    this.setState({ product_keywords: product_keywords });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>{this.state.test}</Text>
        {/* sku ~~~~~~~~~~~~~~~~ */}
        <View style={{ flex: 0.4 }}>
          <Header headerText='Search:' />
          <ScrollView >
            <InputAndBtn inputFieldValue={this.state.product_sku}
              onChangeFn={(text) => this.onInputSkuChange(text)}
              placeholderValue="sku:"
              btnFn={this.search_by_sku}
            />


            {/* id ~~~~~~~~~~~~~~~~ */}
            <InputAndBtn inputFieldValue={this.state.product_id}
              onChangeFn={(text) => this.onInputIdChange(text)}
              placeholderValue="id:"
              btnFn={this.search_by_id}

            />

            {/* author ~~~~~~~~~~~~~~~~ */}
            <InputAndBtn inputFieldValue={this.state.author_keywords}
              onChangeFn={(text) => this.onInputAuthorChange(text)}
              placeholderValue="author:"
              btnFn={this.search_by_author}

            />

            {/* keywords ~~~~~~~~~~~~~~~~ */}
            <InputAndBtn inputFieldValue={this.state.product_keywords}
              onChangeFn={(text) => this.onInputKeywordsChange(text)}
              placeholderValue="keywords:"
              btnFn={this.search_by_keywords}

            />


          </ScrollView>
        </View>




        <View style={{ flex: 0.6 }}>
          <Header headerText='Results:' />
          <Text style={{ color: '#545b62', marginBottom: 10 }}>{this.state.search_status}</Text>

          {this.state.search_status === 'success' ?
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontSize: 15 }}> Name: {this.state.product_name}</Text>
              <Text style={{ color: '#6c757d' }}> ID: {this.state.product_id}</Text>
              <Text style={{ color: '#6c757d' }}> Author: {this.state.product_author}</Text>
              <Text style={{ color: '#6c757d' }}> Sku: {this.state.product_sku}</Text>
              <Text style={{ color: '#6c757d' }}> Status: {this.state.product_status}</Text>
              <Text style={{ color: '#6c757d' }}> Price: {this.state.product_regular_price}</Text>
              <Text style={{ color: '#6c757d' }}> Quantity: {this.state.product_stock_quantity}</Text>
            </View> : null
          }

          {this.state.search_status === 'Success,this author has following book(s)' ?
            <ScrollView>
              {this.state.keywords_or_author_search_result_array.map(el =>
                <View key={el.id} style={{ marginBottom: 20 }}>
                  <Text style={{ fontSize: 20 }} >{el.name}</Text>
                  <Text style={{ color: '#6c757d' }}>Author: {el.attributes[0].options[0]}</Text>
                  <Text style={{ color: '#6c757d' }}>Status: {el.status}</Text>
                  <Text style={{ color: '#6c757d' }}>Price: $ {el.regular_price}</Text>
                  <Text style={{ color: '#6c757d' }}>Qty: {el.stock_quantity}</Text>
                </View>
              )}

            </ScrollView>
            : null
          }

          {this.state.search_status === 'Success,following book(s) contain searched keywords in their titles' ?

            <ScrollView>
              {this.state.keywords_or_author_search_result_array.map(el =>
                <View key={el.id} style={{ marginBottom: 20 }}>
                  <Text style={{ fontSize: 20 }}>{el.name}</Text>
                  <Text style={{ color: '#6c757d' }}>Author: {el.attributes[0].options[0]}</Text>
                  <Text style={{ color: '#6c757d' }}>Status: {el.status}</Text>
                  <Text style={{ color: '#6c757d' }}>Price: $ {el.regular_price}</Text>
                  <Text style={{ color: '#6c757d' }}>Qty: {el.stock_quantity}</Text>
                </View>
              )}
            </ScrollView>


            : null
          }
        </View>



      </View>
    )
  }
}

export default SearchBooks;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
    // paddingTop:30
    //marginTop:30,
  },
});
