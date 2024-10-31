import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addAddress=createAsyncThunk("addresses/addAddress",async(addAddress)=>{
    try {
        const response=await axios.post('http://localhost:3000/addresses', addAddress)
        if(response.status===201){
            console.log("New Address:", response.data)
            return response.data
        }
    } catch (error) {
        throw error
    }
})

export const updateAddress=createAsyncThunk("addresses/updateAddress", async({_id, dataToUpdate})=>{
    try {
        const response=await axios.put(`http://localhost:3000/addresses/${_id}`, dataToUpdate)
        if(response.status===200){
            console.log("updates Address:", response.data)
            return response.data
        }
        
    } catch (error) {
        throw error
    }
})
export const deleteAddress=createAsyncThunk("addresses/deleteAddress", async(addressId)=>{
    try {
        console.log(addressId)
        const response=await axios.delete(`http://localhost:3000/addresses/${addressId}`)
        if(response.status===200){
            return response.data
        }
        
    } catch (error) {
        return error
    }
})
export const fetchAllAddress=createAsyncThunk("addresses/fetchAllAddress", async()=>{
    try {
        const response=await axios.get('http://localhost:3000/addresses')
        if(response.status===200){
          return response.data  
        }
        
    } catch (error) {
        throw error
    }
})


const addressSlice=createSlice({
    name:"address",
    initialState:{
        addresses:[],
        addressAdded: false,
        error:null,
        status:'idle'

    },
    reducer:{

    },
    extraReducers:(builder)=>{
        builder.addCase(fetchAllAddress.pending,(state)=>{
            state.status="loading"
        })
        .addCase(fetchAllAddress.fulfilled, (state,action)=>{
state.status="success"
state.addresses=action.payload
        }).addCase(fetchAllAddress.rejected, (state,action)=>{
            state.status="falied"
            state.error=action.error.message
        })
        .addCase(addAddress.pending,(state)=>{
            state.status="loading"
        })
        .addCase(addAddress.fulfilled, (state,action)=>{
        state.status="success"
        const existingAddress=state.addresses.find((address)=>address._id===action.payload._id)
        if(!existingAddress){
        state.addresses.push(action.payload)
        console.log("new address action",action.payload)
        }

        }).addCase(addAddress.rejected, (state,action)=>{
            state.status="falied"
            state.error=action.error.message
        })
        .addCase(updateAddress.pending,(state)=>{
            state.status="loading"
        })
        .addCase(updateAddress.fulfilled, (state,action)=>{
            state.status="success"
            const index=state.addresses.findIndex((address)=>address._id===action.payload._id)
            console.log("update:",index)
            if(index!==-1){
                state.addresses[index] = action.payload;
            }
        }).addCase(updateAddress.rejected, (state,action)=>{
            state.status="falied"
            state.error=action.error.message
        })
        .addCase(deleteAddress.pending,(state)=>{
            state.status="loading"
        })
        .addCase(deleteAddress.fulfilled, (state,action)=>{
state.status="success"
const existingAddress=state.addresses.find((address)=>address._id===action.payload._id)
if(existingAddress){
state.addresses=action.payload
console.log(action.payload)
}

console.log(existingAddress)
        }).addCase(deleteAddress.rejected, (state,action)=>{
            state.status="falied"
            state.error=action.error.message
        })
    }

})

export default addressSlice.reducer;