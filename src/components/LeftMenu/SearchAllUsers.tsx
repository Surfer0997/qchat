interface ISearchAllUsers {
    handleAllSearch: ()=>void;
}

export const SearchAllUsers = (props:ISearchAllUsers) => {
    return <>
    <p>Start typing user&apos;s nickname or</p>
    <a className='text-blue-400 underline cursor-pointer' onClick={props.handleAllSearch}>Click here to display all users</a>
    </>
}