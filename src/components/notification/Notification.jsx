import {
  Avatar,
  Button,
  Card,
  List,
  Space,
  Tag,
  Typography,
} from "antd";
import {
  BellOutlined,
  CheckOutlined,
  DeleteOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useMemo } from "react";
import { io } from "socket.io-client";
const { Text } = Typography;
import Cookies from "js-cookie"
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { addToNotification, deleteAllNotificationHandlerAsync, deleteNotification, deleteNotificationHandlerAsync, notificationHandlerAsync } from "../../feature/notificationSlice";
import CustomPagination from "../ui/CustomPagination";


const Notification = () => {
  const dispatch = useDispatch()
  const { notification } = useSelector(state => state.notification);
  console.log(notification,"notification");
  
  const [page,setPage]=useState(1)
  const token = Cookies.get("token");


  const socket = useMemo(() => io("http://localhost:3000", {
    auth: {
      token
    }
  }), [])

  useEffect(() => {
    socket.on("connection", () => {
      console.log("Connected", socket.id);
    });

    socket.on("connect_error", (err) => {
      console.log(err.message);
    });

    socket.on("new-notification", (data) => {
      dispatch(addToNotification(data));
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const getNotificationHandler = async () => {
    const data={page:page,limit:9}
    try {
      const res = await dispatch(notificationHandlerAsync({ token ,data})).unwrap();


    } catch (error) {
      toast.error(error.message);

    }
  }

  const deleteNotificationHandler = async (id) => {
    try {
      const res = await dispatch(deleteNotificationHandlerAsync({ id: id, token })).unwrap();
      if (res.success) {
        dispatch(deleteNotification(id))
        toast.success(res.message);

      }

    } catch (error) {
      toast.error(error.message);
    }
  }
  const deleteAllNotificationHandler = async () => {
    try {
      const res = await dispatch(deleteAllNotificationHandlerAsync({ token })).unwrap();
      if (res.success) {
        toast.success(res.message);
      }
    } catch (error) {
     toast.error(error.message);

    }
  }

  useEffect(() => {
    getNotificationHandler();
  }, [page])



  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <BellOutlined className="text-2xl text-red-500" />
          <h1 className="text-3xl font-bold">Notifications</h1>
        </div>

        {/* <Button onClick={()=>{deleteAllNotificationHandler()}} type="primary">
          Delete All
        </Button> */}
      </div>

      {/* Notification List */}
      <Card className="shadow-md rounded-xl">
        <List
          itemLayout="horizontal"
          dataSource={notification.notification}
          renderItem={(item) => {
            console.log(item,"fgsd")

            return(
              <>
                  <List.Item
              actions={[

                <Button
                  onClick={() => { deleteNotificationHandler(item.id) }}
                  key="delete"
                  icon={<DeleteOutlined />}
                  danger
                  type="text"
                />,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    size={50}
                    src={item.avatar}
                    icon={<UserOutlined />}
                  />
                }
                title={
                  <Space>
                    <Text strong>{item.title}</Text>

                    {!item.isRead && (
                      <Tag color="red">New</Tag>
                    )}
                  </Space>
                }
                description={
                  <>
                    <p className="mb-1 text-gray-700">
                      {item?.message}
                    </p>

                    <Text type="secondary">
                      {item.time}
                    </Text>
                  </>
                }
              />
            </List.Item>
</>
            )
          }
        }   
        
          
        />
      </Card>
        <div className="flex justify-center">
            <CustomPagination pageSize={9} pageNumber={page} onchange={(e)=>{setPage(e)}}  total={notification?.count} />
          </div>
    </div>
  );
};

export default Notification;