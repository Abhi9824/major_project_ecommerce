import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react";

export const addAddress=createAsyncThunk("address/addAddress",async(addAddress)=>{
    try {
        const response=await axios.post('http://localhost:3000/checkout/addresses', addAddress)
        if(response.status===201){
            return response.data
        }
    } catch (error) {
        throw error
    }
})

export const updateAddress=createAsyncThunk("addresses/updateAddress", async(addressId, dataToUpdate)=>{
    try {
        const response=await axios.put(`http://localhost:3000/checkout/addresses/${addressId}`, dataToUpdate)
        if(response.status===200){
            return response.data
        }
        
    } catch (error) {
        throw error
    }
})
export const deleteAddress=createAsyncThunk("addresses/deleteAddress", async(addressId)=>{
    try {
        const response=await axios.delete(`http://localhost:3000/checkout/addresses/${addressId}`)
        if(response.status===200){
            return response.data
        }
        
    } catch (error) {
        return error
    }
})
export const fetchAllAddress=createAsyncThunk("checkout/fetchAllAddress", async()=>{
    try {
        const response=await axios.get('http://localhost:3000/checkout/addresses')
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
            const existingAddress=state.addresses.find((address)=>address._id===action.payload._id)
            console.log("update:",existingAddress)
            if(existingAddress){
            state.addresses=action.payload
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
}
        }).addCase(deleteAddress.rejected, (state,action)=>{
            state.status="falied"
            state.error=action.error.message
        })
    }

})

export default addressSlice.reducer;