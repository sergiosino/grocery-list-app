import { useState, useEffect } from 'react'
import uuid from 'react-native-uuid'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { ASYNC_STORAGE_KEYS } from '../constants/constants'

export function useGroceryItems ({ itemIdToFocus }) {
  const [groceryList, setGroceryItems] = useState([])

  const updateGroceryList = (newGroceryList) => {
    const jsonValue = JSON.stringify(newGroceryList)
    AsyncStorage.setItem(ASYNC_STORAGE_KEYS.GROCERY_LIST, jsonValue)
    setGroceryItems(newGroceryList)
  }

  const handleAddItem = () => {
    const newGroceryItem = { id: uuid.v4(), checked: false, text: '' }
    const groceryItemsCopy = [newGroceryItem, ...groceryList]
    // groceryItemsCopy.push(newGroceryItem)
    itemIdToFocus.current = newGroceryItem.id
    updateGroceryList(groceryItemsCopy)
  }

  const handleDeleteChecked = () => {
    const groceryItemsCopy = groceryList.filter(groceryItem => !groceryItem.checked)
    updateGroceryList(groceryItemsCopy)
  }

  const handleUnCheckAll = () => {
    itemIdToFocus.current = null
    const groceryItemsUnChecked = groceryList.map(groceryItem => { return { ...groceryItem, checked: false } })
    updateGroceryList(groceryItemsUnChecked)
  }

  const handleCheckAll = () => {
    const groceryItemsChecked = groceryList.map(groceryItem => { return { ...groceryItem, checked: true } })
    updateGroceryList(groceryItemsChecked)
  }

  const handleDeleteItem = (id) => {
    const groceryItemsCopy = groceryList.filter(groceryItem => groceryItem.id !== id)
    updateGroceryList(groceryItemsCopy)
  }

  const handleItemChange = (id, checked, text) => {
    const itemIndex = groceryList.findIndex(groceryItem => groceryItem.id === id)
    const item = groceryList[itemIndex]

    if (item.checked !== checked || item.text !== text) {
      const groceryItemsCopy = [...groceryList]
      groceryItemsCopy[itemIndex] = { id, checked, text }
      updateGroceryList(groceryItemsCopy)
    }
  }

  useEffect(() => {
    const getStorageGroceryList = async () => {
      let storageGroceryList = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.GROCERY_LIST)
      storageGroceryList = storageGroceryList != null ? JSON.parse(storageGroceryList) : null
      if (storageGroceryList) { setGroceryItems(storageGroceryList) }
    }
    getStorageGroceryList()
  }, [])

  return {
    groceryList,
    handleAddItem,
    handleDeleteItem,
    handleDeleteChecked,
    handleCheckAll,
    handleUnCheckAll,
    handleItemChange
  }
}
