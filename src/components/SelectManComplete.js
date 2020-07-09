import React,{useState} from 'react'
import {Input,AutoComplete} from 'antd'
import {getTeachersByFuzzy} from '../services/administer/deparmentAdminister'

const mockVal = (str, repeat = 1) => ({
    value: str.repeat(repeat),
  });


const SelectManComplete = (props) => {
    const [value, setValue] = useState('');
    const [options, setOptions] = useState([]);
  
    const onSearch = searchText => {
        if (searchText.length > 1) {
                //!searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)],
                getTeachersByFuzzy({ "searchTxt": searchText }).then(res => {
                    let r=[]
                    if (res.data.result) {
                       let  data=JSON.parse(res.data.data)
                        console.log(data)
                        r=data.map(item=>{
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
    };

    const onSelect = data => {
      console.log('onSelect', data);
    };
  
    const onChange = data => {
        console.log(data)
        setValue(data);
        console.log(props)
        props.chooseMan(data)
    };
  
    return (
      <>
        <AutoComplete
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
      </>
    );
  };

  export default SelectManComplete