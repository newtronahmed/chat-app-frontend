
function checkError (name){
    if(name) {
        return true
    }else {
        return false
    }
}
function errorMessage (name){
    if(checkError){
        return (
            <div>
                {name.message}
            </div>
        )
    }
}
return errorMessage;