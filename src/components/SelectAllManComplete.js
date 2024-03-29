import React from 'react'
import { Input, AutoComplete, Select } from 'antd'
import { getAllManByFuzzy } from '../services/administer/deparmentAdminister'

const { Option } = Select;
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
      idorname: '',
      selectedValue: '',     //选择的id
      type: "0",
      options: [],
      db: [],
      autocomDisable:false
    };

    //console.log('init')
  }

  triggerChange = (changedValue) => {
    //console.log(changedValue)
    if (this.props.onChange) {
      this.props.onChange(changedValue);
    }
  };

  // const [value, setValue] = useState(props.initValue);
  // const [options, setOptions] = useState([]);
  // const [db, setDb] = useState([]);

  onSearch = searchText => {
    if (this.state.type == 1) return;   //如果是校外人员，退出
    if (searchText.length > 1) {
      //!searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)],
      getAllManByFuzzy({ "searchTxt": searchText }).then(res => {
        let r = []
        if (res.result) {
          let data = JSON.parse(res.data)
          this.setState({ db: data });
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
        this.setState({ options: r });
      })
    }
  }
  //父组件更新时，会触发此事件
  componentWillReceiveProps(nextProps) {
    //console.log(this.props, nextProps)
    if (this.props.initvalue && !this.props.value)
      this.initValue(this.props.initvalue)
  }

  componentDidMount() {
    if (this.props.value) {
      this.initValue(this.props.value)
    }
  }

  async initValue(v) {
    let type = '0'
    let idorname = ''

    if (v.indexOf("undefinded") == -1) {
      //console.log("VVV",v)
      let type = v.split(":")[0]
      let idorname = v.split(":")[1]
      //console.log("VVV",type,idorname)
      this.setState(
        {
          idorname,
          type,
          autocomDisable:type == "2",
          selectedValue:'',
        }
      );

      //console.log(type,idorname)

      if (type == "0") {
        await getAllManByFuzzy({ "searchTxt": idorname }).then(res => {

          if (res.result) {
            //console.log("find me")
            let data = JSON.parse(res.data)
            //console.log(data)
            if (data.length >= 1) {   //只有一条记录
              this.setState({ value: `${data[0].id}-${data[0].name}` });
            }
          }

        })
      }
      else {
        this.setState({
          value: idorname
        });
      }

      this.triggerChange(
        {
          type,
          selectedValue: type == "0" ? idorname : "",
          value: idorname
        }
      );

    }
    else {
      //第二次加载但没有修改的时候，要能提交给父节点
      this.triggerChange(
        {
          type,
          selectedValue: type == "0" ? idorname : "",
          value: idorname
        }
      );
    }


  }

  onSelect = data => {
    //console.log("select" + data)
    let finded = this.state.db.find(a => a.id === data)
    finded && this.setState({ value: `${finded.id}-${finded.name}` });
    if (this.props.chooseMan) {
      this.props.chooseMan(data)
    };

    this.triggerChange(
      {
        type: this.state.type,
        value: data,
        selectedValue: data
      }
    );


  };

  onChange = data => {
    // console.log(data)
    this.setState({
      value: data,
      idorname: data
    });
    this.triggerChange(
      {
        type: this.state.type,
        value: data,
        selectedValue:''
      }
    );
    // console.log(props)
    // props.chooseMan(data)
  };

  personTypeChange = value => {
    //console.log(value);
    this.state.value = "";
    this.triggerChange(
      {
        type: value,
        value: "",
        selectedValue: ""
      }
    );
    this.setState({
      type: value,
      autocomDisable:value == "2"
    });
  };
  render() {
    return (
      <>
        <Select defaultValue={"0"} value={String(this.state.type)} style={{ width: 120 }} onChange={this.personTypeChange}>
          <Option value="0">校内</Option>
          <Option value="1">校外</Option>
          <Option value="2">无</Option>
        </Select>

        <AutoComplete
          disabled={this.state.autocomDisable}
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
        > <Input.Search size="large" placeholder="input here" enterButton value={this.state.value} onChange={this.onChange} />
        </AutoComplete>
      </>
    );
  }
};

export default SelectManComplete