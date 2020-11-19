import React, { useState, useEffect } from 'react'
import { Input, AutoComplete } from 'antd'
import { getAllManByFuzzy } from '../services/administer/deparmentAdminister'

//使用Demo:
//<SelectAllManComplete chooseMan={this.chooseMan} initValue={'991823'} key={1}/>
//在父组件中添加：
// chooseMan=(man)=>{
//   this.setState(
//     {
//       administerID:man
//     }
//   )
// }

class SelectManComplete extends React.Component {

  constructor(...prop) {
    super(...prop);
    //console.log(prop[0].value)
    this.state = {
      value: this.props.value,
      options: [],
      db: []
    };

  }

   triggerChange = (changedValue) => {
    console.log(changedValue)
    if (this.props.onChange) {
      this.props.onChange(changedValue);
    }
  };

  // const [value, setValue] = useState(props.initValue);
  // const [options, setOptions] = useState([]);
  // const [db, setDb] = useState([]);

  onSearch = searchText => {
    if (searchText.length > 1) {
      //!searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)],
      getAllManByFuzzy({ "searchTxt": searchText }).then(res => {
        let r = []
        if (res.result) {
          let data = JSON.parse(res.data)
          this.setState({ db:data});
          r = data.map(item => {
            return {
              value: item.id,
              label: (<div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <span>{item.id}</span>
                <span>{item.name}</span>
                <span>{item.department}</span>
              </div>)
            }

          })
        }
        this.setState({ options:r});
      })
    }
  }

  componentDidMount() {
    //console.log(props.initValue)
    let v = this.props.value || this.props.initValue
    v && getAllManByFuzzy({ "searchTxt": v }).then(res => {
      if (res.result) {

        let data = JSON.parse(res.data)
        //console.log(data)
        if (data.length === 1) {   //只有一条记录
          this.setState({ value: `${data[0].id}-${data[0].name}` });
        }
      }
    })
  }

  onSelect = data => {
    //console.log("select" + data)
    let finded = this.state.db.find(a => a.id === data)
    finded && this.setState({ value: `${finded.id}-${finded.name}` });
    if (this.props.chooseMan) {
      this.props.chooseMan(data)
    };
    this.triggerChange(data);
    
  };

  onChange = data => {
    // console.log(data)
    this.setState({ value: data });
    // console.log(props)
    // props.chooseMan(data)
  };
  render() {
    return (
      <AutoComplete
        allowClear
        dropdownMatchSelectWidth={252}
        value={this.state.value}
        options={this.state.options}
        style={{
          width: 300,
        }}
        onSelect={this.onSelect}
        onSearch={this.onSearch}
        onChange={this.onChange}
        placeholder="选择人员"
      >  <Input.Search size="large" placeholder="input here" enterButton value={this.state.value} onChange={this.onChange}/>
      </AutoComplete>
    );
  }
};

export default SelectManComplete