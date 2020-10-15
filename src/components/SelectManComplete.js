import React, { useState, useEffect } from 'react'
import { Input, AutoComplete } from 'antd'
import { getTeachersByFuzzy } from '../services/administer/deparmentAdminister'

//使用Demo:
//<SelectManComplete chooseMan={this.chooseMan} initValue={'991823'} />
//在父组件中添加：
// chooseMan=(man)=>{
//   this.setState(
//     {
//       administerID:man
//     }
//   )
// }

const SelectManComplete = (props) => {

  const [value, setValue] = useState(props.initValue);
  const [options, setOptions] = useState([]);
  const [db, setDb] = useState([]);

  const onSearch = searchText => {
    if (searchText.length > 1) {
      //!searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)],
      getTeachersByFuzzy({ "searchTxt": searchText }).then(res => {
        let r = []
        if (res.result) {
          let data = JSON.parse(res.data)
          setDb(data)
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
        setOptions(r)
      })
    }
  }

  useEffect(() => {
    //console.log(props.initValue)
    props.initValue && getTeachersByFuzzy({ "searchTxt": props.initValue }).then(res => {
      if (res.result) {

        let data = JSON.parse(res.data)
        //console.log(data)
        if (data.length === 1) {   //只有一条记录
          setValue(`${data[0].id}-${data[0].name}`)
        }
      }
    })

  })

  const onSelect = data => {
    //console.log("select" + data)
    let finded = db.find(a => a.id === data)
    finded && setValue(`${finded.id}-${finded.name}`);
    props.chooseMan(data)
  };

  const onChange = data => {
    // console.log(data)
    setValue(data);
    // console.log(props)
    // props.chooseMan(data)
  };

  return (
    <AutoComplete
        allowClear
        dropdownMatchSelectWidth={252}
        value={value}
        options={options}
        style={{
          width: 300,
        }}
        onSelect={onSelect}
        onSearch={onSearch}
        onChange={onChange}
        placeholder="选择人员"
      >  <Input.Search size="large" placeholder="input here" enterButton />
      </AutoComplete>
  );
};

export default SelectManComplete