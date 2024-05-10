import { bserver } from "../App";
const notestate = ()=>{
    const handleAdd = async (e) => {
        e.preventDefault();
        try {
          const { title, description, tag } = task;
          const { data } = await axios.post(`${bserver}/task/createtask`, {
            title, description, tag
          }, {
            headers: {
              "Content-Type": "application/json"
            },
            withCredentials: true
          });
          toast.success(data.message);
          navigate("/")
        } catch (error) {
          console.error(error);
          toast.error(error.response.data.message)
        }
      };
      return (
        <context.Provider value={{handleAdd}}>
          <App/>
        </context.Provider>
      )
    
    }