import { createSlice } from "@reduxjs/toolkit";


export const dataSlice = createSlice({
    name: 'data',
    initialState: {
        value: {
            myUser: null,
            users: [],
            posting: [],
            post: null,
            profile: null,
            chat: null
        }
    },
    reducers: {
        setUsers: (state, action) => {
            state.value.users = action.payload
        },
        setMyUser: (state, action) => {
            state.value.myUser = action.payload
        },
        setPosting: (state, action) => {
            state.value.posting = action.payload
        },
        setPost: (state, action) => {
            state.value.post = action.payload
        },
        setProfile: (state, action) => {
            state.value.profile = action.payload
        }, 
        setChat: (state, action) => {
            state.value.chat = action.payload
        }
    }
})

export const {
    setUsers,
    setMyUser,
    setPosting,
    setPost,
    setProfile,
    setChat
} = dataSlice.actions

export default dataSlice.reducer;