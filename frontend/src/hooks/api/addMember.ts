type addMemberProps = {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    confirmPassword: string;
}
async function addMember(data: addMemberProps): Promise<string>{
    try{
        const response = await fetch('http://localhost:8080/members/register',{
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok){
            const errorMsg = await response.text();
            throw new Error(errorMsg);}

        return await response.text();
    }
    catch(err){
        throw err;
    }
}

export default addMember;