import React, { useState } from "react";

function Todo({item, deleteItem, modifyItem}){
    const [todoItm, setTodoItm] = useState(item); // 수정용 item. 의미: 화면에는 나타나지 않지만 실제 DB에 반영되야할 데이터를 담고 있음.
    const [turnModify, setTurnModify] = useState(false);

    const checkHandle = () =>{
        var tmpCheckState = false;
        if(item.done === true) tmpCheckState = false;
        else tmpCheckState = true;
        setTodoItm({
            ...item,
            done: tmpCheckState
        })
        modifyItem(todoItm);
    }

    const deleteHandle = () =>{
        console.log(`${item.id}가 삭제 선택되었습니다.`);
        deleteItem(item);
    };

    const clickModify = () =>{
        if(turnModify === false) setTurnModify(true);
        else{
            setTurnModify(false);
            modifyItem(todoItm);
        }
    }

    const modifyHandle = (event) =>{
        setTodoItm({
            ...todoItm,
            title: event.target.value
        });
    }

    return(
        <div>
            {
                turnModify === false?
                <>
                    <input type="checkbox" id={item.id} name={item.id} value={item.title} checked = {item.done} onChange={checkHandle}/>
                    <label id={item.id}>{item.title}</label>
                    <button onClick={clickModify}>수정</button>
                    <button onClick={deleteHandle}>삭제</button>
                </>
                :
                <>
                    <input type="text" name="title" id={item.id} value={todoItm.title} onChange={modifyHandle} />
                    <button onClick={clickModify}>수정완료</button>
                </>

            }
        </div>
    )
}

export default Todo;