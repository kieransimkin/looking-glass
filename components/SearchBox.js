import { TextField, IconButton } from "@material-ui/core"
import { useRouter, useSearchParams, usePathname } from "next/router";
import { useState } from "react";
/**
 * @description Creates a search form with a text field and an submit button. It uses
 * state to store the search term, and provides event handlers for changing the search
 * term and submitting the form.
 * 
 * @param { string } width - width of the SearchBox form, which is used to style the
 * form's display property.
 * 
 * @param { function. } onFocus - event handler that is triggered when the search box
 * gains focus.
 * 
 * 		- `onFocus`: A function that is triggered when the focus state of the form
 * changes. It has no arguments.
 * 
 * @param { function. } onBlur - function to be executed when the Search Box form
 * loses focus.
 * 
 * 		- `onBlur`: A function that is called when the user loses focus from the search
 * box. It can perform any actions necessary before the focus is transferred to the
 * next component.
 * 		- `() => {}`: This is a void function, meaning it does not return anything. It
 * is called when the user loses focus from the search box.
 * 
 * @returns { IconButton } a form with a search field and an submit button for searching
 * policies.
 * 
 * 		- `form`: A `HTMLFormElement` object that contains the form for searching.
 * 		+ `onSubmit`: An event handler that is called when the form is submitted. It
 * prevents the default submission behavior and logs the search term to the console
 * before redirecting to the appropriate page.
 * 		+ `autoComplete`: A boolean value indicating whether the input field should
 * display a dropdown menu with possible search terms (set to "on" by default).
 * 		+ `noValidate`: An boolean value indicating whether the form should be marked
 * as invalid if the search term is empty (set to "true" by default).
 * 		+ `style`: An object containing CSS styles for the form.
 * 			- `display`: A string value indicating the display type of the form (set to
 * "flex" by default).
 * 			- `width`: A number value indicating the width of the form (set to 600 pixels
 * by default).
 * 		- `<TextField>`: An instance of the `TextField` component that contains the
 * search input field.
 * 		+ `inputProps`: An object containing properties for the input field, including:
 * 			- `autoComplete`: A boolean value indicating whether the input field should
 * display a dropdown menu with possible search terms (set to "on" by default).
 * 			- `onChange`: An event handler that is called when the user types in the input
 * field (uses `searchChange` function).
 * 			- `onFocus`: A function that is called when the user focuses on the input field
 * (uses `onFocus` function).
 * 			- `onBlur`: A function that is called when the user loses focus from the input
 * field (uses `onBlur` function).
 * 			- `type`: A string value indicating the type of input field (set to "search"
 * by default).
 * 			- `id`: A string value indicating the ID of the input field (set to "search"
 * by default).
 * 			- `label`: A string value indicating the label for the input field (sets to
 * "Search by Policy ID, Wallet Address or 💲handle" by default).
 * 			- `name`: A string value indicating the name of the input field (set to "search"
 * by default).
 * 			- `variant`: A string value indicating the variant of the input field (set to
 * "outlined" by default).
 * 			- `fullWidth`: A boolean value indicating whether the input field should take
 * up the full width of its parent element (set to "true" by default).
 * 		- `<IconButton>`: An instance of the `IconButton` component that contains the
 * search button.
 * 		+ `type`: A string value indicating the type of button (set to "submit" by default).
 * 		+ `ariaLabel`: A string value indicating the alternative text for the button
 * (set to "search" by default).
 */
export default function SearchBox({width, onFocus, onBlur,autoComplete='on', autoFocus=true}) {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState();
    /**
     * @description Sets the value of the `searchTerm` variable to the selected value
     * from the input field.
     * 
     * @param { object } e - value entered by the user into the search box and sets it
     * as the `searchTerm`.
     */
    const searchChange = (e) => { 
            setSearchTerm(e.target.value)
    }
    /**
     * @description Prevents the default form submission behavior and logs the search
     * term to the console, then redirects the user to a page with the same name as the
     * search term.
     * 
     * @param { object } e - event object, which is used to prevent the default behavior
     * of the button's action and log the search term to the console before redirecting
     * to the corresponding page.
     */
    const onSubmit = (e) => { 
        e.preventDefault()
        console.log(searchTerm);
        window.location = '/'+searchTerm;
        //router.push({pathname: '/'+searchTerm})
    }
    return (
            <form onSubmit={onSubmit} autoComplete={autoComplete} noValidate style={{display: 'flex',width: width?width:600}}> 
            
            <TextField inputProps={{autoComplete:autoComplete, onChange:searchChange, onFocus: ()=>{if (onFocus) onFocus()}, onBlur:()=>{if (onBlur) onBlur()}, autoFocus }} type="search" id="search" label={width?'Search':"Search by Policy ID, Wallet Address or 💲handle"} name="search" variant="outlined" fullWidth />
            <IconButton type="submit" aria-label="search" >🔎</IconButton>
            </form>
    );
}