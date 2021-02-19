import React, { useState } from 'react';
import {Input, Layout,Tooltip} from 'antd';
import { InfoCircleOutlined, ScheduleOutlined } from '@ant-design/icons';

function TableInput() {
  const {Search} = Input;
  const onSearch = value =>console.log(value)

  return (
    <Layout className="restaurant-tableinput" style={{maxWidth:"95%"}}>
      <Search
        placeholder="Enter your table number"
        prefix={<ScheduleOutlined className="site-form-item-icon" />}
        maxLength={'20px'}
        size={'large'}
        enterButton={'Enter'}
        onSearch={onSearch}
        suffix={
          <Tooltip title="You can order food through this page, or if you ordered offline,
           please input your table number here">
            <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
          </Tooltip>
        }
      />
    </Layout>
  );
}


export default TableInput;
