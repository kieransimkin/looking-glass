import React, {useState, useRef, useImperativeHandle} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Menu, {MenuProps} from '@material-ui/core/Menu'
import MenuItem, {MenuItemProps} from '@material-ui/core/MenuItem'
import ArrowRight from '@material-ui/icons/ArrowRight'
import ArrowLeft from '@material-ui/icons/ArrowLeft'
import clsx from 'clsx'
import { Popper,Paper, MenuList } from '@material-ui/core'
// This is copied from https://github.com/azmenak/material-ui-nested-menu-item
// I added directionality, so that menus can open left as well as right. 
// I've submitted a pull request to the original author:
// https://github.com/azmenak/material-ui-nested-menu-item/pull/49

const TRANSPARENT = 'rgba(0,0,0,0)'
const useMenuItemStyles = makeStyles((theme) => ({
  root: (props) => ({
    backgroundColor: props.open ? theme.palette.action.hover : TRANSPARENT
  })
}))

/**
 * Use as a drop-in replacement for `<MenuItem>` when you need to add cascading
 * menu elements as children to this component.
 */
const NestedMenuItem = React.forwardRef(function NestedMenuItem(props, ref) {
  const {
    parentMenuOpen,
    component = 'div',
    label,
    direction = 'right',
    rightIcon = <ArrowRight />,
    leftIcon = <ArrowLeft />,
    children,
    onClick,
    className,
    tabIndex: tabIndexProp,
    MenuProps = {},
    ContainerProps: ContainerPropsProp = {},
    searchFocused=false,
    ...MenuItemProps
    
  } = props

  const {ref: containerRefProp, ...ContainerProps} = ContainerPropsProp

  const menuItemRef = useRef();
  
  useImperativeHandle(ref, () => menuItemRef.current)
  
  

  const containerRef = useRef();
  useImperativeHandle(containerRefProp, () => containerRef.current)

  const menuContainerRef = useRef();

  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false)
  
  const handleMouseEnter = (event) => {
    setIsSubMenuOpen(true)

    if (ContainerProps?.onMouseEnter) {
      ContainerProps.onMouseEnter(event)
    }
  }
  const handleMouseLeave = (event) => {
    if (!searchFocused) {
      setIsSubMenuOpen(false)

      if (ContainerProps?.onMouseLeave) {
        ContainerProps.onMouseLeave(event)
      }
    }
    
  }

  // Check if any immediate children are active
  const isSubmenuFocused = () => {
    const active = containerRef.current?.ownerDocument?.activeElement
    for (const child of menuContainerRef.current?.children ?? []) {
      if (child === active) {
        return true
      }
    }
    return false
  }

  const handleFocus = (event) => {
    if (event.target === containerRef.current || searchFocused) {
      setIsSubMenuOpen(true)
    }

    if (ContainerProps?.onFocus) {
      ContainerProps.onFocus(event)
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      return
    }

    if (isSubmenuFocused()) {
      event.stopPropagation()
    }

    const active = containerRef.current?.ownerDocument?.activeElement

    if (event.key === 'ArrowLeft' && isSubmenuFocused()) {
      containerRef.current?.focus()
    }

    if (
      event.key === 'ArrowRight' &&
      event.target === containerRef.current &&
      event.target === active
    ) {
      const firstChild = menuContainerRef.current?.children[0] 
      firstChild?.focus()
    }
  }

  const open = (isSubMenuOpen && parentMenuOpen) || searchFocused
  const menuItemClasses = useMenuItemStyles({open})

  // Root element must have a `tabIndex` attribute for keyboard navigation
  let tabIndex
  if (!props.disabled) {
    tabIndex = tabIndexProp !== undefined ? tabIndexProp : -1
  }
  let iconStyle ={};
  let icon = rightIcon;
  if (direction=="left") { 
    iconStyle={position:'absolute', left:'0px', top:'10px'}
    icon = leftIcon;
  }
  console.log(searchFocused,menuItemRef.current);
  return (
    <div
      {...ContainerProps}
      ref={containerRef}
      onFocus={handleFocus}
      tabIndex={tabIndex}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
      style={{top:'0px !important'}}
    >
      <MenuItem
        {...MenuItemProps}
        className={clsx(menuItemClasses.root, className)}
        onClick={onClick}
        ref={menuItemRef}
      >
        {label}
      <div style={iconStyle}>{icon}</div>
      </MenuItem>
      <Popper
                            modifiers={{offset:{offset:'-0px'}}}
                                
                             
                                anchorEl={searchFocused?containerRef.current:menuItemRef?.current}
                                keepMounted
                                open={open}
                                getContentAnchorEl={null} 
                                placement='right'
                                onMouseLeave={()=>{ 
                                  return;
                                  
                                }}
                                style={{position:'relative',top:'50'}}
                                className="menupopper"
                            
                                
                            >
                             <Paper className="menupaper" style={{borderTopRightRadius:'0px !important'}}>
                                <MenuList>
      
        <div ref={menuContainerRef} style={{pointerEvents: 'auto'}}>
          {children}
        </div>
      
      </MenuList></Paper></Popper>
    </div>
  )
})

export default NestedMenuItem
