/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
/* eslint-disable import/no-named-as-default */
import React, { memo } from 'react'
import { map, prop, addIndex } from 'ramda'
import { orNull } from 'root/src/shared/util/ramdaPlus'
import AutoCompleteEmbedded from 'root/src/client/web/embedded/embeddedModules/AutoCompleteEmbedded'
import DropdownEmbedded from 'root/src/client/web/embedded/embeddedModules/DropdownEmbedded'
import { withStyles } from '@material-ui/core/styles'

const styles = {
    fields: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        '@media(max-width: 800px)': {
            paddingTop: 50,
        },
        '@media(max-width: 631px)': {
            flexDirection: 'column',
            alignItems: 'center',
        },
    },
    label: {
        fontSize: 14,
        marginLeft: 25,
        marginBottom: 8,
    },
    autoComplete: {
        dispaly: 'flex',
        flexDirection: 'column',
        alignSelf: 'flex-end',
        '@media(max-width: 321px)': {
            alignSelf: 'center',
        },
    },
    dropDown: {
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'flex-start',
        '@media(max-width: 631px)': {
            marginBottom: -106,
            marginRight: 160,
            alignSelf: 'flex-end',
        },
        '@media(max-width: 321px)': {
            alignSelf: 'center',
            marginBottom: 0,
            marginRight: 0,
        },
    },
}

const EmbeddedFieldUnstyled = memo(({ fields, classes, ...moduleProps }) => (
 <div className={classes.fields}>
  {orNull(fields, addIndex(map)(({ inputType, ...embedProps }, idx) => {
   switch (inputType) {
    case 'autoCompleteEmbedded':
     return (
      <div
       key={prop('fieldId', embedProps)}
       className={classes.autoComplete}
      >
       {orNull(prop('fieldCaption', embedProps),
        <div className={classes.label}>{prop('fieldCaption', embedProps)}</div>)}
       <AutoCompleteEmbedded
        {...moduleProps}
        fieldId={prop('fieldId', embedProps)}
        fieldIndex={idx}
       />
      </div>
     )
    case 'dropdownEmbedded':
     return (
      <div
       key={prop('fieldId', embedProps)}
       className={classes.dropDown}
      >
       {orNull(prop('fieldCaption', embedProps),
        <div className={classes.label}>{prop('fieldCaption', embedProps)}</div>)}
       <DropdownEmbedded
        {...moduleProps}
        fieldId={prop('fieldId', embedProps)}
        fieldIndex={idx}
       />
      </div>
     )
    default:
   }
  }, fields))}
 </div>
))

export default withStyles(styles)(EmbeddedFieldUnstyled)