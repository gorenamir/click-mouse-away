# Change Log

All notable changes to this project will be documented in this file.

## 1.0.5 (2020-10-25)

add disconnectedCallback() lifecycle method to click-away and move its initialization 
logic to the connectedCallback() lifecycle method.

## 1.0.4 (2020-10-23)

replace the stopPropagation functionality in the click-away component with a more
robust e.composedPath() check.

## 1.0.3 (2020-10-23)

use CustomEvent to represent both clickaway and mouseaway events.

## 1.0.2 (2020-10-23)

fix bug related to incorrect this binding when using eval.

## 1.0.1 (2020-10-22)

minor bug fix related to block-level slots.