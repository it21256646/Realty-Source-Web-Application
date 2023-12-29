

const Modal = ({isVisible,onClose,children}) => {
    if(!isVisible) return null;

    const handleClose = (e) =>{
        if(e.target.id === 'wrapper') onClose();
    }


    return(
        <div className='scroll-50 fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'
        id="wrapper" onClick={handleClose}>
            <div className="w-[600px] flex-col overflow-y-auto justify-center items-center">
                
                <div className="bg-white p-2 rounded justify-center">
                
                    {children}
                    <button className="bg-[#dc2626] text-white p-3 rounded-lg uppercase hover:opacity-85"
                onClick={()=>onClose()}>Cancel</button>
                    </div>
            </div>
        </div>
    );
};
  

export default Modal;
