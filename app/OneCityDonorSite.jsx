"use client";
import { useState, useEffect, useRef, useCallback } from "react";

// ─── Brand tokens ─────────────────────────────────────────────────────────────
const c = {
  navy:     "#0B2342",
  blue:     "#1462A8",
  skyBlue:  "#1976D2",
  yellow:   "#F5C400",
  orange:   "#E05A1C",
  white:    "#FFFFFF",
  offWhite: "#F4F7FC",
  lightBlue:"#E8F1FB",
  slate:    "#4A6070",
  green:    "#2E7D4E",
  border:   "#D2E0F0",
  red:      "#C62828",
};

// ─── Embedded images ──────────────────────────────────────────────────────────
const IMGS = {
  ufli:             "https://cdn.sanity.io/images/q2b9xvlh/production/a4aa622146ab6aa68c18f99c4c2d1f21a02081aa-250x77.svg",
  holly:            "https://your-cdn.com/images/holly-lane.jpg",
  viv:              "https://your-cdn.com/images/viv-ramakrishnan.jpg",
  oneCity:          "https://projectread.imgix.net/media/46d80b8b-fdb4-45ef-86d2-d5efbb54f5a1.png?auto=format%2Ccompress",
  projectReadGreen: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAIAAAC2BqGFAAABCGlDQ1BJQ0MgUHJvZmlsZQAAeJxjYGA8wQAELAYMDLl5JUVB7k4KEZFRCuwPGBiBEAwSk4sLGHADoKpv1yBqL+viUYcLcKakFicD6Q9ArFIEtBxopAiQLZIOYWuA2EkQtg2IXV5SUAJkB4DYRSFBzkB2CpCtkY7ETkJiJxcUgdT3ANk2uTmlyQh3M/Ck5oUGA2kOIJZhKGYIYnBncAL5H6IkfxEDg8VXBgbmCQixpJkMDNtbGRgkbiHEVBYwMPC3MDBsO48QQ4RJQWJRIliIBYiZ0tIYGD4tZ2DgjWRgEL7AwMAVDQsIHG5TALvNnSEfCNMZchhSgSKeDHkMyQx6QJYRgwGDIYMZAKbWPz9HbOBQAAAR/klEQVR42u2daXAc13HH3zkze3Bx3/fiBijwECAQIEGJ1EFZliU7NhWZkWTLjuNUElelKmcl/pCKnHKl4nI5rkoqcSp24kiiIku2UrosySJpggRIgCBBkcSxIAASF3FjscAec73Oh1ksYYqKQBILLpnpj8AsZvY373X3v1+/B/yZv92PbIu/ERuBDdoGbZsN2gZtg7bNBm2Dts0GbYO2Qdtmg7ZB22aDtkHboG2zQdugbbNB26Bt0LbZoG3QttmgbdA2aNts0Dbo6xrGGGNsY/24sfV8aYTohg4AjDJKKAAIEHcQC4wxRhghBAgwwgAACBIR9FJ4OdOTLnN5bmneH1zkjClcoYQCCAGQ4HwBgW7ohmlgjDEmQpgSl6zhkligDdP45iNfeezeh2UmTyxMnR48e7z/ZP/YgD+4KDFJkWSCiQABCUMcI4wxBgSGaeiGzijLSEovzirMT8tVZGVifrKz/3RIDXHG1+WZ8a33R1NCAqHl5/ce+OqDB6751dDUpbbejuN9Jwcnh8NaROayzKXbTpxgghAYpqkZGiE03ZNalltalV+en57rkB0IQCBghE4uTL90+NWFZT+j7NafFq9LI7oQ4kd/8IP89FwARAgGAAAghERdHkDfuO9Yz4l236nL0yO6aShclpiEMRIAG0bcchGGMDRDxwinuJO8OSXVBRVFmQUuxSWE0AzNCioYYVOYHuem3pH+/zr8qrQeg5rd+gQ0hemUnS7FRTCxwshKULE4CkpodX5ldX7lVx88cP5yb2tPe8fA6fH5CVMIh6RwxhFCINYz8nycrylMVdcAwOPcVJ1fWVVY4c0q8rg2AYBm6CE1ZD02wdE0jFEWUsN5GXkp7uTF4OKtD2p2664OEDBKOWPXm6QYYYoQEiAAEKd8m7dum7curIa7h88f7WnrGuyeWpzBCCmSwilfx0TF4itAqLomhOlSXN7s4urCytKc4hR3CkJIN/SQGkYIk1V8rzGJcpfiXFhaQDRRgiEmCH+KW8QIkOUAkUN2NFU1NFU1LIYCXRfPtva0dV86P7c0RwlVuGINn5sjHuOr6ZohTIeklGQXVRdUlOeWpntSCaG6oYW1CEJAMPkkvpYBAKGEU7YuU42hDTSMEI4SBxCAMEpyevbWteyta5kJzHUMdLX2tF8Y6fOHFjlhiqSsPRlfnaLppiEzKS89r6qgrCKvLCs5g1OuGbqqa4AAY0wwRgjfwAMnWh59Y6kVicZJAEAYZXjSPnvvI5+995HxuSvtvs5jPSf6xwf8wYDEmCIpBBNTmJ+E2EoudUNnlGcmZ1TklVbmV+SmZstc0k1DN3Qr+l0NHTc6Ou5c0B+X7AAgAAjGeWk5X2p64ktNTwxNXjre19HWf/LilWFVV12Kk2ByTUTCGGu6JgAyktLKcr3VBRV56blOyWEIUzf04EqIw+j2VwUYSgzDGNOrxAUhxJtd7M0ufub+/X1jvg8/OvrumV8ZprE6+mOMVV0tyixsrm4syS5wKW4rRQt+LIW422odnxRSYhN8zcTpb6SGBZXVBZXN1Y3ffuk7McoE44im1hbXPNXyeUqoZmmhhOS7QWVSAcJyDgKEKW5MDRKMKYmmhrppbPfWPbRlz3IkaP3QFKbb6f5M/UMIQUgNAQDBJJELh3EEDQgRTIKR0MLyIsGEEmIRFzdMnBCMAaA8u8T6IMFYM4y8tJwkp0czDAv9Gt463Ebpz+LnMTDGb3X+8j8OH0QIVedX7q5pqi/bluJOjopGIdBqEbkGl8IYXbkUAwIHVzDGCMEaMwOHJBNCTdNUdXXjxz6LH+XR2fEfvvMjIYBR2trTdvTC8Yyk9G3eut01zdu8dW7FZV1sCoExWptjxavnSzRDXGvli567dGFifqo4s7A816ubxt0DenpxRtO1ZFeybupuhxsjtBRefr/78Afdh3NTc+pLt7bUNNcV18pcWiFuxiOUAYDM5ffPHDrUfZRRegSOfa7x0abqxogW3siwGRfQmGBAUJlXXpxZ1D8+4HF6rEoIo8zDOCA0uzT3Rsc7b516ryAjf0d5/a6aHbUFVTFXawpByfogAASU0sXgYpev2yk7OOMRLdLR37W9dMtqygIA30hqlDCgEQYAt+L6u2e+ffDoa12DZ68sTAJCDq4QxhBCnHLZKQPAxPyVl1tfe/3Em96s4uaqhp1VjeW5petFOephEFYNzapXWJPGFKZu6jKXY+VcB5cBhGpo8ZM28QqG1uJFXmrOn37+W8vh5dNDHx3taeseOjcdmCWYOCSFUIIQkpmkcEWAGJoa7h3rf6X152U53oe2PPBEw6OYrJui+/hQjRXKOWMRTfWNDzokpSir4EYzooQQLNH1TQC3w727tnl3bfP88kLnwJnWnrZzl3sWlv2UMoekUIwwwgpXHJLDFGbfuO/kQFcgFHhuz9NCCELi6EYppf5g4OCR167MTyKE68u3fa5xnwkCxWFcx1cZWslbrHKU6k7Zt23vvm17JxemTvq6Wnvbe0b7/cFFiXGFK1YkdMpOSuivLxx/bs/TcaVsBcn23s6R6bFkd5IpzE5fV21RVXluaTzyv/iCFiCilWgABEggsBKS7JSsJxsfe7LxscvTo239HW29Hb4rF0PhsMwlhSuBUCCnbNvVj8fz8ZbCSxLnQgiMMMZkKbRMSHSd6I4BDQis8qa1SBjNKACsdStLNBdlFhRlFny55Yu+iYvHe0+293dOzE9u82795iPPw83WKKPrfmuTQhjjVU4Z4pd4xFcZHjl37MeHXgSAuqLaltrmLcWbHZKyQtyEqFMBSmhFbllFbtlX9nx5OjCbnZz5SUHsU29KCHFKDoSwpmufVMK+eyS4RfnKwtTfv/FDVYtwxt889d47p3+Vn5Z7X/n2lpqmzYXVjLIYcWsMWsQtytZfuNGbMspUXT07fF4IUV1Q6VKcmq7d/aDH5ybCaijFlayZepJzEwCa9E//rO2NN06+U5xZ2FTZsKu6sSq/wtIp1ugWIKKl+hufwoSQiKa+dPjV4alLCOGTaaee3fu0W3HezaAtZVieU5qTkjUyO+5xbiKYIQQy4wqXBYjLMyO+icFXj/+iLMe7s6qxuaqxJKswShzgJrI6AcIpOU8Pnh2cHE52JiGMxmYnzgx99GDdbtXQ7l7QCANAksvzwoG//s/Dr5wf6ZlbWqCEKlxmlMSyZgGif3zg3OWel46+WpVXsatmx46KhtzU7JuLSBihsBpmlAkQCBCjLKyGEUL4Lh7RMWVYluN94cBfTS/Odvi6WnvbL4z0+YOLnHGFyxRTjLBDcjhlpynM7uFznYNnUlwv1+RX7du6d09dy024aesFx/xXQq0DxF8ZIshMSn+8Yd/jDfvG5iba+zqP9Z7onxhYCi5bzY8YRXUKxlg3jI6BriPnj/3Jk3+0f+eT8VaGq6NubI04TjeK79ewxB4AWOtY+Wm5+3c++Y+/+91/+r1/+MbDz5XneDVDcwfXVV1dqRoTt8PtcW56v/uQFd/i+ngE46zkDFVTEUK6oWNMMpLSTNPAd5wEt6QdxhiBgJUuDkpoaXZJaXbJsw/8ds+Y71hP+wlf58jMmKVrZE6Casjq2oJ4Tn+MsaprO6oapv0zvolBiUsPbm7Oz8jTdC0eN467MowlyNfNmmsLKmsLKr/24O+cu9x7tKft1MUz04szpdkl33j4ObTSeR/XccAp39/yhdnAnMSkZFeSZmhxerXxVYadA6d/cuhlU5jbvVt2Ve+oLqi4HnHEGd9eWre9tC6shicWpvLTc2UmIYTivQKCETbBNA0z3ZMmQMR1LTGOgmVmcfaFn31vMbjImdQz2v9a2/+UZpc0VTXsrNpRllMSy5oBCSshA4QcsqM0uzjeTuMa1ggj3dCtleI7UhlemhkNhJZS3SmaqTskRYAYmBy6MNp3sPX1ytzyndWNTZUNBel50XYZJBCsqgfd1HcGtGpFyqoWre3PbMBLjY9gwRgh5M0qTnWnzARmPc5N1thxcMUpOUxhnhu5cHro7E8PH6wpqG6p2dFYcW9mUsZK77q4uQzaFCI/PRchZPlZ0zQK0vOEgASRLPECDQBpm1L+5um/+PGHL/omBv2h36zuS04sY0MYnRe7Tvg6Ut2pW4prW2qa6su2JbuSbsJ1WH14pdklj9/3aHtfBwDcf8/OmsIqVVdj1au7VxkC1BXX/uDr3700PdLWd/J4b8fFK0OhcNjaMoQRppi4ZBfGOKJHfn3h+JHzxzOTM7aW3PPI1j0NZdtuNOXAGOum0Vxz3xbvZkDgVlzqSuku2v+HVgkTBHcJaOsrWdW44szC4szCA7v3940PHO890d7fOTw1opuazBWZSQgBJdRq/AiEAh90H3q364O/+r1/+MbDz5XneDVD8wcXVV1dqRoTt8PtcW56v/uQFd/i+ngE46zkDFVTEUK6oWNMMpLSTNPAdJ8Et6YdxhiBgJUuDkpoaXZJaXbJsw/8ds+Y71hP+wlf58jMmKVrZE6Casjq2oJ4Tn+MsaprO6oapv0zvolBiUsPbm7Oz8jTdC0eN467MowlyNfNmmsLKmsLKr/24O+cu9x7tKft1MUz04szpdkl33j4ObTSeR/XccAp39/yhdnAnMSkZFeSZmhxerXxVYadA6d/cuhlU5jbvVt2Ve+oLqi4HnHEGd9eWre9tC6shicWpvLTc2UmIYTivQKCETbBNA0z3ZMmQMR1LTGOgmVmcfaFn31vMbjImdQz2v9a2/+UZpc0VTXsrNpRllMSy5oBCSshA4QcsqM0uzjeTuMa1ggj3dCtleI7UhlemhkNhJZS3SmaqTskRYAYmBy6MNp3sPX1ytzyndWNTZUNBel50XYZJBCsqgfd1HcGtGpFyqoWre3PbMBLjY9gwRgh5M0qTnWnzARmPc5N1thxcMUpOUxhnhu5cHro7E8PH6wpqG6p2dFYcW9mUsZK77q4uQzaFCI/PRchZPlZ0zQK0vOEgASRLPECDQBpm1L+5um/+PGHL/omBf2h36zuS04sY0MYnRe7Tvg6Ut2pW4prW2qa6su2JbuSbsJ1WH14pdklj9/3aHtfBwDcf8/OmsIqVVdj1au7VxkC1BXX/uDr3700PdLWd/J4b8fFK0OhcNjaMoQRppi4ZBfGOKJHfn3h+JHzxzOTM7aW3PPI1j0NZdtuNOXAGOum0Vxz3xbvZkDgVlzqSuku2v+HVgkTBHcJaOsrWdW44szC4szCA7v3940PHO890d7fOTw1opuazBWZSQgBJdRq/AiEAh90H3q364O//r1/+MbDz5XneDVDcwfXVV1dqRoTt8PtcW56v/uQFd/gA=",
  projectReadWhite: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAIAAAC2BqGFAAABCGlDQ1BJQ0MgUHJvZmlsZQAAeJxjYGA8wQAELAYMDLl5JUVB7k4KEZFRCuwPGBiBEAwSk4sLGHADoKpv1yBqL+viUYcLcKakFicD6Q9ArFIEtBxopAiQLZIOYWuA2EkQtg2IXV5SUAJkB4DYRSFBzkB2CpCtkY7ETkJiJxcUgdT3ANk2uTmlyQh3M/Ck5oUGA2kOIJZhKGYIYnBncAL5H6IkfxEDg8VXBgbmCQixpJkMDNtbGRgkbiHEVBYwMPC3MDBsO48QQ4RJQWJRIliIBYiZ0tIYGD4tZ2DgjWRgEL7AwMAVDQsIHG5TALvNnSEfCNMZchhSgSKeDHkMyQx6QJYRgwGDIYMZAKbWPz9HbOBQAAAR/klEQVR42u2daXAc13HH3zkze3Bx3/fiBijwECAQIEGJ1EFZliU7NhWZkWTLjuNUElelKmcl/pCKnHKl4nI5rkoqcSp24kiiIku2UrosySJpggRIgCBBkcSxIAASF3FjscAec73Oh1ksYYqKQBILLpnpj8AsZvY373X3v1+/B/yZv92PbIu/ERuBDdoGbZsN2gZtg7bNBm2Dts0GbYO2Qdtmg7ZB22aDtkHboG2zQdugbbNB26Bt0LbZoG3QttmgbdA2aNts0Dbo6xrGGGNsY/24sfV8aYTohg4AjDJKKAAIEHcQC4wxRhghBAgwwgAACBIR9FJ4OdOTLnN5bmneH1zkjClcoYQCCAGQ4HwBgW7ohmlgjDEmQpgSl6zhkligDdP45iNfeezeh2UmTyxMnR48e7z/ZP/YgD+4KDFJkWSCiQABCUMcI4wxBgSGaeiGzijLSEovzirMT8tVZGVifrKz/3RIDXHG1+WZ8a33R1NCAqHl5/ce+OqDB6751dDUpbbejuN9Jwcnh8NaROayzKXbTpxgghAYpqkZGiE03ZNalltalV+en57rkB0IQCBghE4uTL90+NWFZT+j7NafFq9LI7oQ4kd/8IP89FwARAgGAAAghERdHkDfuO9Yz4l236nL0yO6aShclpiEMRIAG0bcchGGMDRDxwinuJO8OSXVBRVFmQUuxSWE0AzNCioYYVOYHuem3pH+/zr8qrQeg5rd+gQ0hemUnS7FRTCxwshKULE4CkpodX5ldX7lVx88cP5yb2tPe8fA6fH5CVMIh6RwxhFCINYz8nycrylMVdcAwOPcVJ1fWVVY4c0q8rg2AYBm6CE1ZD02wdE0jFEWUsN5GXkp7uTF4OKtD2p2664OEDBKOWPXm6QYYYoQEiAAEKd8m7dum7curIa7h88f7WnrGuyeWpzBCCmSwilfx0TF4itAqLomhOlSXN7s4urCytKc4hR3CkJIN/SQGkYIk1V8rzGJcpfiXFhaQDRRgiEmCH+KW8QIkOUAkUN2NFU1NFU1LIYCXRfPtva0dV86P7c0RwlVuGINn5sjHuOr6ZohTIeklGQXVRdUlOeWpntSCaG6oYW1CEJAMPkkvpYBAKGEU7YuU42hDTSMEI4SBxCAMEpyevbWteyta5kJzHUMdLX2tF8Y6fOHFjlhiqSsPRlfnaLppiEzKS89r6qgrCKvLCs5g1OuGbqqa4AAY0wwRgjfwAMnWh59Y6kVicZJAEAYZXjSPnvvI5+995HxuSvtvs5jPSf6xwf8wYDEmCIpBBNTmJ+E2EoudUNnlGcmZ1TklVbmV+SmZstc0k1DN3Qr+l0NHTc6Ou5c0B+X7AAgAAjGeWk5X2p64ktNTwxNXjre19HWf/LilWFVV12Kk2ByTUTCGGu6JgAyktLKcr3VBRV56blOyWEIUzf04EqIw+j2VwUYSgzDGNOrxAUhxJtd7M0ufub+/X1jvg8/OvrumV8ZprE6+mOMVV0tyixsrm4syS5wKW4rRQt+LIW422odnxRSYhN8zcTpb6SGBZXVBZXN1Y3ffuk7McoE44im1hbXPNXyeUqoZmmhhOS7QWVSAcJyDgKEKW5MDRKMKYmmhrppbPfWPbRlz3IkaP3QFKbb6f5M/UMIQUgNAQDBJJELh3EEDQgRTIKR0MLyIsGEEmIRFzdMnBCMAaA8u8T6IMFYM4y8tJwkp0czDAv9Gt463Ebpz+LnMTDGb3X+8j8OH0QIVedX7q5pqi/bluJOjopGIdBqEbkGl8IYXbkUAwIHVzDGCMEaMwOHJBNCTdNUdXXjxz6LH+XR2fEfvvMjIYBR2trTdvTC8Yyk9G3eut01zdu8dW7FZV1sCoExWptjxavnSzRDXGvli567dGFifqo4s7A816ubxt0DenpxRtO1ZFeybupuhxsjtBRefr/78Afdh3NTc+pLt7bUNNcV18pcWiFuxiOUAYDM5ffPHDrUfZRRegSOfa7x0abqxogW3siwGRfQmGBAUJlXXpxZ1D8+4HF6rEoIo8zDOCA0uzT3Rsc7b516ryAjf0d5/a6aHbUFVTFXawpByfogAASU0sXgYpev2yk7OOMRLdLR37W9dMtqygIA30hqlDCgEQYAt+L6u2e+ffDoa12DZ68sTAJCDq4QxhBCnHLZKQPAxPyVl1tfe/3Em96s4uaqhp1VjeW5petFOephEFYNzapXWJPGFKZu6jKXY+VcB5cBhGpo8ZM28QqG1uJFXmrOn37+W8vh5dNDHx3taeseOjcdmCWYOCSFUIIQkpmkcEWAGJoa7h3rf6X152U53oe2PPBEw6OYrJui+/hQjRXKOWMRTfWNDzokpSir4EYzooQQLNH1TQC3w727tnl3bfP88kLnwJnWnrZzl3sWlv2UMoekUIwwwgpXHJLDFGbfuO/kQFcgFHhuz9NCCELi6EYppf5g4OCR167MTyKE68u3fa5xnwkCxWFcx1cZWslbrHKU6k7Zt23vvm17JxemTvq6Wnvbe0b7/cFFiXGFK1YkdMpOSuivLxx/bs/TcaVsBcn23s6R6bFkd5IpzE5fV21RVXluaTzyv/iCFiCilWgABEggsBKS7JSsJxsfe7LxscvTo239HW29Hb4rF0PhsMwlhSuBUCCnbNvVj8fz8ZbCSxLnQgiMMMZkKbRMSHSd6I4BDQis8qa1SBjNKACsdStLNBdlFhRlFny55Yu+iYvHe0+293dOzE9u82795iPPw83WKKPrfmuTQhjjVU4Z4pd4xFcZHjl37MeHXgSAuqLaltrmLcWbHZKyQtyEqFMBSmhFbllFbtlX9nx5OjCbnZz5SUHsU29KCHFKDoSwpmufVMK+eyS4RfnKwtTfv/FDVYtwxt889d47p3+Vn5Z7X/n2lpqmzYXVjLIYcWsMWsQtytZfuNGbMspUXT07fF4IUV1Q6VKcmq7d/aDH5ybCaijFlayZepJzEwCa9E//rO2NN06+U5xZ2FTZsKu6sSq/wtIp1ugWIKKl+hufwoSQiKa+dPjV4alLCOGTaaee3fu0W3HezaAtZVieU5qTkjUyO+5xbiKYIQQy4wqXBYjLMyO+icFXj/+iLMe7s6qxuaqxJKswShzgJrI6AcIpOU8Pnh2cHE52JiGMxmYnzgx99GDdbtXQ7l7QCANAksvzwoG//s/Dr5wf6ZlbWqCEKlxmlMSyZgGif3zg3OWel46+WpVXsatmx46KhtzU7JuLSBihsBpmlAkQCBCjLKyGEUL4Lh7RMWVYluN94cBfTS/Odvi6WnvbL4z0+YOLnHGFyxRTjLBDcjhlpynM7uFznYNnUlwv1+RX7du6d09dy024aesFx/xXQq0DxF8ZIshMSn+8Yd/jDfvG5iba+zqP9Z7onxhYCi5bzY8YRXUKxlg3jI6BriPnj/3Jk3+0f+eT8VaGq6NubI04TjeK79ewxB4AWOtY+Wm5+3c++Y+/+91/+r1/+MbDz5XneDVD8wcXVV1dqRoTt8PtcW56v/uQFd/i+ngE46zkDFVTEUK6oWNMMpLSTNPAdJ8Et6YdxhiBgJUuDkpoaXZJaXbJsw/8ds+Y71hP+wlf58jMmKVrZE6Casjq2oJ4Tn+MsaprO6oapv0zvolBiUsPbm7Oz8jTdC0eN467MowlyNfNmmsLKmsLKr/24O+cu9x7tKft1MUz04szpdkl33j4ObTSeR/XccAp39/yhdnAnMSkZFeSZmhxerXxVYadA6d/cuhlU5jbvVt2Ve+oLqi4HnHEGd9eWre9tC6shicWpvLTc2UmIYTivQKCETbBNA0z3ZMmQMR1LTGOgmVmcfaFn31vMbjImdQz2v9a2/+UZpc0VTXsrNpRllMSy5oBCSshA4QcsqM0uzjeTuMa1ggj3dCtleI7UhlemhkNhJZS3SmaqTskRYAYmBy6MNp3sPX1ytzyndWNTZUNBel50XYZJBCsqgfd1HcGtGpFyqoWre3PbMBLjY9gwRgh5M0qTnWnzARmPc5N1thxcMUpOUxhnhu5cHro7E8PH6wpqG6p2dFYcW9mUsZK77q4uQzaFCI/PRchZPlZ0zQK0vOEgASRLPECDQBpm1L+5um/+PGHL/omBv2h36zuS04sY0MYnRe7Tvg6Ut2pW4prW2qa6su2JbuSbsJ1WH14pdklj9/3aHtfBwDcf8/OmsIqVVdj1au7VxkC1BXX/uDr3700PdLWd/J4b8fFK0OhcNjaMoQRppi4ZBfGOKJHfn3h+JHzxzOTM7aW3PPI1j0NZdtuNOXAGOum0Vxz3xbvZkDgVlzqSuku2v+HVgkTBHcJaOsrWdW44szC4szCA7v3940PHO890d7fOTw1opuazBWZSQgBJdRq/AiEAh90H3q364O/+r1/+MbDz5XneDVDcwfXVV1dqRoTt8PtcW56v/uQFd/gA=",
};

// ─── Seeded PRNG for deterministic scatter plots ──────────────────────────────
function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const SCATTER_SLOPE = 0.45;
const SCATTER_BASE_Y = 85;

function genSchools(count, oneCityX, seed) {
  const rand = seededRandom(seed);
  const schools = [];
  for (let i = 0; i < count + 20; i++) {
    if (schools.length >= count) break;
    const x = rand() * 72 + 2;
    const baseY = SCATTER_BASE_Y - x * SCATTER_SLOPE;
    const y = Math.max(20, Math.min(99, baseY + (rand() - 0.5) * 30));
    if (Math.abs(x - oneCityX) > 4) schools.push([x, y]);
  }
  return schools;
}

const MS_SCHOOLS = genSchools(58, 72, 42071);
const ES_SCHOOLS = genSchools(42, 70, 91823);

// ─── Intersection observer hook (fires once, then disconnects) ────────────────
function useOnScreen(threshold = 0.3) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ob = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          ob.disconnect();
        }
      },
      { threshold }
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// ─── Partner badges ──────────────────────────────────────────────────────────
function UFLIBadge({ dark = false }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <img src={IMGS.ufli} alt="UFLI logo" style={{
        width: 52, height: 52, objectFit: "contain", borderRadius: 8,
        filter: dark ? "brightness(0) invert(1)" : "none",
      }} />
      <div>
        <div style={{ fontWeight: 800, color: dark ? c.white : c.navy, fontSize: 13, lineHeight: 1.2, fontFamily: "'Museo Slab', 'Rockwell', serif" }}>University of Florida</div>
        <div style={{ color: dark ? "rgba(255,255,255,0.65)" : c.slate, fontSize: 11, fontWeight: 500 }}>Literacy Institute</div>
        <div style={{ color: dark ? c.yellow : c.blue, fontSize: 10, fontWeight: 600, marginTop: 1 }}>700,000+ classrooms</div>
      </div>
    </div>
  );
}

function ProjectReadBadge({ dark = false }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <img src={dark ? IMGS.projectReadGreen : IMGS.projectReadWhite} alt="Project Read AI logo" style={{
        height: 44, objectFit: "contain", borderRadius: 8,
      }} />
      <div>
        <div style={{ fontWeight: 800, color: dark ? c.white : c.navy, fontSize: 13, lineHeight: 1.2, fontFamily: "'Museo Slab', 'Rockwell', serif" }}>Project Read AI</div>
        <div style={{ color: dark ? "rgba(255,255,255,0.65)" : c.slate, fontSize: 11, fontWeight: 500 }}>AI Phonics Tutor</div>
        <div style={{ color: dark ? c.yellow : c.green, fontSize: 10, fontWeight: 600, marginTop: 1 }}>240,000+ classrooms · 115+ countries</div>
      </div>
    </div>
  );
}

// ─── Animated counter (clamped, observer disconnects) ─────────────────────────
function Num({ n, suffix = "", prefix = "", dec = 0, ms = 1400 }) {
  const [v, setV] = useState(0);
  const [ref, visible] = useOnScreen(0.3);
  useEffect(() => {
    if (!visible) return;
    let f = 0;
    const tot = 55;
    const t = setInterval(() => {
      f++;
      const raw = n * (1 - Math.pow(1 - f / tot, 3));
      setV(Math.min(n, raw));
      if (f >= tot) { setV(n); clearInterval(t); }
    }, ms / tot);
    return () => clearInterval(t);
  }, [visible, n, ms]);
  return <span ref={ref}>{prefix}{dec ? v.toFixed(dec) : Math.floor(v).toLocaleString()}{suffix}</span>;
}

// ─── Stat tile ────────────────────────────────────────────────────────────────
function Stat({ n, suffix = "", prefix = "", dec = 0, label, sub, bg = c.blue, accent = c.yellow, large = false }) {
  return (
    <div style={{
      background: bg, borderRadius: 16, padding: large ? "26px 22px" : "20px 18px",
      textAlign: "center", flex: 1, minWidth: 130,
    }}>
      <div style={{
        fontSize: large ? 44 : 38, fontWeight: 900, color: accent, lineHeight: 1,
        fontFamily: "'Oswald', sans-serif", letterSpacing: "-1px",
      }}>
        <Num n={n} suffix={suffix} prefix={prefix} dec={dec} />
      </div>
      <div style={{ color: c.white, fontWeight: 700, fontSize: 13, marginTop: 7, lineHeight: 1.35, fontFamily: "'Museo Slab', 'Rockwell', serif" }}>{label}</div>
      {sub && <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, marginTop: 3 }}>{sub}</div>}
    </div>
  );
}

// ─── Horizontal bar (observer disconnects) ────────────────────────────────────
function Bar({ label, value, color, dark = false }) {
  const [w, setW] = useState(0);
  const [ref, visible] = useOnScreen(0.3);
  useEffect(() => {
    if (visible) {
      const t = setTimeout(() => setW(value), 150);
      return () => clearTimeout(t);
    }
  }, [visible, value]);
  return (
    <div ref={ref} style={{ marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: dark ? "rgba(255,255,255,0.85)" : c.navy, fontFamily: "'Museo Slab', 'Rockwell', serif" }}>{label}</span>
        <span style={{ fontSize: 14, fontWeight: 800, color }}>{value}%</span>
      </div>
      <div style={{ background: dark ? "rgba(255,255,255,0.1)" : "#D8E8F8", borderRadius: 6, height: 10, overflow: "hidden" }}>
        <div style={{
          height: "100%", width: `${w}%`, background: color, borderRadius: 6,
          transition: "width 1.1s cubic-bezier(0.4,0,0.2,1)",
        }} />
      </div>
    </div>
  );
}

// ─── Scatter plot ──────────────────────────────────────────────────────────────
function ScatterPlot({ title, subtitle, others, ocX, ocY, callout, calloutSub }) {
  const [ref, shown] = useOnScreen(0.15);

  const VW = 340, VH = 230, lpad = 40, bpad = 32, tpad = 14, rpad = 12;
  const iW = VW - lpad - rpad, iH = VH - bpad - tpad;
  const xs = v => lpad + (v / 80) * iW;
  const ys = v => tpad + iH - (v / 100) * iH;
  const x1t = 0, y1t = SCATTER_BASE_Y, x2t = 80, y2t = SCATTER_BASE_Y - SCATTER_SLOPE * 80;

  return (
    <div ref={ref} style={{
      background: c.white, border: `1.5px solid ${c.border}`, borderRadius: 16,
      padding: "18px 18px 14px", flex: 1, minWidth: 270,
    }}>
      <div style={{ fontWeight: 800, color: c.navy, fontSize: 14, marginBottom: 2, fontFamily: "'Oswald', sans-serif", textTransform: "uppercase", letterSpacing: "0.5px" }}>{title}</div>
      <div style={{ fontSize: 11, color: c.slate, marginBottom: 8 }}>{subtitle}</div>
      <svg width="100%" viewBox={`0 0 ${VW} ${VH}`} style={{ overflow: "visible" }} role="img" aria-label={`${title}: scatter plot showing ${callout} ${calloutSub}`}>
        {[0, 25, 50, 75, 100].map(v => (
          <g key={v}>
            <line x1={lpad} y1={ys(v)} x2={VW - rpad} y2={ys(v)} stroke="#EEF2F8" strokeWidth="1" />
            <text x={lpad - 5} y={ys(v) + 3.5} textAnchor="end" fontSize="8.5" fill="#8CA0B0">{v}</text>
          </g>
        ))}
        {[0, 20, 40, 60, 80].map(v => (
          <g key={v}>
            <line x1={xs(v)} y1={tpad} x2={xs(v)} y2={VH - bpad} stroke="#EEF2F8" strokeWidth="1" />
            <text x={xs(v)} y={VH - bpad + 12} textAnchor="middle" fontSize="8.5" fill="#8CA0B0">{v}%</text>
          </g>
        ))}
        <line x1={lpad} y1={tpad} x2={lpad} y2={VH - bpad} stroke={c.border} strokeWidth="1.5" />
        <line x1={lpad} y1={VH - bpad} x2={VW - rpad} y2={VH - bpad} stroke={c.border} strokeWidth="1.5" />
        <text x={VW / 2} y={VH - 1} textAnchor="middle" fontSize="9.5" fill={c.slate} fontWeight="600">% Black Students Enrolled</text>
        <text x={9} y={tpad + iH / 2} textAnchor="middle" fontSize="9.5" fill={c.slate} fontWeight="600"
          transform={`rotate(-90,9,${tpad + iH / 2})`}>Growth Percentile</text>
        <line x1={xs(x1t)} y1={ys(y1t)} x2={xs(x2t)} y2={ys(y2t)}
          stroke={c.slate} strokeWidth="1.8" strokeDasharray="5,3.5" opacity="0.45" />
        {others.map(([x, y], i) => (
          <circle key={`s-${i}`} cx={xs(x)} cy={ys(y)} r={shown ? 4.5 : 0}
            fill={c.slate} opacity={0.28}
            style={{ transition: `r 0.35s ease ${Math.min(i * 0.012, 0.4)}s` }} />
        ))}
        <circle cx={xs(ocX)} cy={ys(ocY)} r={shown ? 10 : 0}
          fill={c.yellow} stroke={c.orange} strokeWidth="2.5"
          style={{ transition: "r 0.6s cubic-bezier(0.34,1.56,0.64,1) 0.55s" }} />
        {shown && (
          <text x={xs(ocX) + 14} y={ys(ocY) + 4}
            fontSize="10.5" fontWeight="800" fill={c.navy}>One City</text>
        )}
      </svg>
      <div style={{ display: "flex", gap: 14, marginTop: 2, justifyContent: "center", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div style={{ width: 9, height: 9, borderRadius: "50%", background: c.slate, opacity: 0.4 }} />
          <span style={{ fontSize: 10.5, color: c.slate }}>Other WI schools</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div style={{ width: 11, height: 11, borderRadius: "50%", background: c.yellow, border: `2px solid ${c.orange}` }} />
          <span style={{ fontSize: 10.5, color: c.navy, fontWeight: 700 }}>One City</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <svg width="18" height="6"><line x1="0" y1="3" x2="18" y2="3" stroke={c.slate} strokeWidth="1.6" strokeDasharray="4,2.5" opacity="0.5" /></svg>
          <span style={{ fontSize: 10.5, color: c.slate }}>Trend</span>
        </div>
      </div>
      <div style={{ background: c.yellow, borderRadius: 10, padding: "10px 14px", marginTop: 12, textAlign: "center" }}>
        <div style={{ fontSize: 24, fontWeight: 900, color: c.navy, fontFamily: "'Oswald', sans-serif", lineHeight: 1 }}>{callout}</div>
        <div style={{ fontSize: 11, fontWeight: 700, color: c.navy, marginTop: 3, lineHeight: 1.35, fontFamily: "'Museo Slab', 'Rockwell', serif" }}>{calloutSub}</div>
      </div>
    </div>
  );
}

// ─── Quote card with photo ─────────────────────────────────────────────────────
function Quote({ text, name, title, compact = false, photo = null }) {
  return (
    <div style={{
      background: c.navy, borderRadius: 18, padding: compact ? "22px 24px" : "30px 34px",
      position: "relative", overflow: "hidden", height: "100%", boxSizing: "border-box",
    }}>
      <div style={{
        fontSize: 80, color: c.yellow, opacity: 0.11, position: "absolute", top: -16, left: 14,
        lineHeight: 1, fontFamily: "Georgia, serif", userSelect: "none", pointerEvents: "none",
      }}>{"\u201C"}</div>
      <p style={{
        color: c.white, fontSize: compact ? 14.5 : 17, lineHeight: 1.68, fontStyle: "italic",
        margin: "0 0 16px 0", position: "relative", zIndex: 1, fontFamily: "'Museo Slab', 'Rockwell', serif",
      }}>{text}</p>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.13)", paddingTop: 12, display: "flex", alignItems: "center", gap: 12 }}>
        {photo && (
          <img src={photo} alt={name} style={{
            width: 44, height: 44, borderRadius: "50%", objectFit: "cover",
            border: `2px solid ${c.yellow}`, flexShrink: 0,
          }} />
        )}
        <div>
          <div style={{ color: c.yellow, fontWeight: 700, fontSize: 13, fontFamily: "'Oswald', sans-serif", textTransform: "uppercase", letterSpacing: "0.5px" }}>{name}</div>
          <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 11, marginTop: 2, lineHeight: 1.4 }}>{title}</div>
        </div>
      </div>
    </div>
  );
}

// ─── Section header ───────────────────────────────────────────────────────────
function SH({ title, accent = c.yellow }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
      <div style={{ width: 5, height: 30, background: accent, borderRadius: 3 }} />
      <h2 style={{
        margin: 0, fontSize: 21, fontWeight: 800, color: c.navy,
        fontFamily: "'Oswald', sans-serif", letterSpacing: "0.5px", textTransform: "uppercase",
      }}>{title}</h2>
    </div>
  );
}

// ─── Emoji icons map (avoids dangerouslySetInnerHTML) ─────────────────────────
const EMOJI = {
  chart: "\uD83D\uDCCA",       // 📊
  school: "\uD83C\uDFEB",      // 🏫
  trending: "\uD83D\uDCC8",    // 📈
  globe: "\uD83C\uDF0E",       // 🌎
  bulb: "\uD83D\uDCA1",        // 💡
  family: "\uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC67\u200D\uD83D\uDC66", // 👨‍👩‍👧‍👦
  calendar: "\uD83D\uDCC5",    // 📅
  microscope: "\uD83D\uDD2C",  // 🔬
  barChart: "\uD83D\uDCCA",    // 📊
  graduation: "\uD83C\uDF93",  // 🎓
  lab: "\uD83D\uDD2C",         // 🔬
  book: "\uD83D\uDCDA",        // 📚
  building: "\uD83C\uDFDB\uFE0F", // 🏛️
  star: "\u2B50",               // ⭐
};

// ─── Path nav button (proper React hover state) ──────────────────────────────
function PathBtn({ path, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      onFocus={() => setHov(true)} onBlur={() => setHov(false)}
      style={{
        background: c.white, border: `1.5px solid ${hov ? c.blue : c.border}`, borderRadius: 14,
        padding: "16px 20px", cursor: "pointer", display: "flex", alignItems: "center",
        gap: 12, textAlign: "left", width: "100%", transition: "all 0.18s",
        boxShadow: hov ? "0 5px 20px rgba(20,98,168,0.12)" : "0 1px 5px rgba(0,0,0,0.04)",
        transform: hov ? "translateY(-2px)" : "none",
        outline: "none",
      }}>
      <div style={{
        width: 44, height: 44, background: c.lightBlue, borderRadius: 11,
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0,
      }}>
        {path.icon}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 800, color: c.navy, fontSize: 15, marginBottom: 1, fontFamily: "'Oswald', sans-serif", textTransform: "uppercase", letterSpacing: "0.4px" }}>{path.label}</div>
        <div style={{ color: c.slate, fontSize: 12.5, fontFamily: "'Museo Slab', 'Rockwell', serif" }}>{path.tagline}</div>
      </div>
      <div style={{ color: c.blue, fontSize: 17, fontWeight: 700, flexShrink: 0 }}>{"\u2192"}</div>
    </button>
  );
}

// ─── Explore-more button (proper React hover state) ───────────────────────────
function ExploreBtn({ path, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      onFocus={() => setHov(true)} onBlur={() => setHov(false)}
      style={{
        background: c.white, border: `1.5px solid ${hov ? c.blue : c.border}`, borderRadius: 9,
        padding: "8px 14px", cursor: "pointer", fontSize: 12.5, fontWeight: 600, color: c.navy,
        display: "flex", alignItems: "center", gap: 6, transition: "border-color 0.17s",
        fontFamily: "'Museo Slab', 'Rockwell', serif", outline: "none",
      }}>
      <span>{path.icon}</span> {path.label}
    </button>
  );
}

// ─── Pipeline (pauses on hover) ───────────────────────────────────────────────
function Pipeline() {
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setStep(s => (s + 1) % 4), 2200);
    return () => clearInterval(t);
  }, [paused]);
  const steps = [
    { label: "One City Schools", sub: "400 students\nHighest-need, real stakes", bg: c.blue },
    { label: "Rigorous Research", sub: "Dr. Matthew Burns\nFluency growth data", bg: c.navy },
    { label: "Federal Investment", sub: "US DOE Grant\nto UFLI for AI tools", bg: c.orange },
    { label: "Global Scale", sub: "700K+ classrooms\n115+ countries", bg: c.green },
  ];
  return (
    <div style={{ padding: "20px 0 4px" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: "4px 0" }}>
        {steps.map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center" }}>
            <button
              onClick={() => { setStep(i); setPaused(true); }}
              style={{
                background: i <= step ? s.bg : "#D8E6F2", borderRadius: 13, padding: "16px 18px",
                textAlign: "center", minWidth: 118, transition: "all 0.5s ease",
                transform: i === step ? "scale(1.07)" : "scale(1)",
                boxShadow: i === step ? "0 5px 22px rgba(0,0,0,0.16)" : "none",
                border: "none", cursor: "pointer", outline: "none",
              }}>
              <div style={{ color: i <= step ? c.white : "#9BAABB", fontWeight: 800, fontSize: 12.5, lineHeight: 1.3, fontFamily: "'Oswald', sans-serif", textTransform: "uppercase" }}>{s.label}</div>
              <div style={{
                color: i <= step ? "rgba(255,255,255,0.72)" : "#B5C5D0", fontSize: 10.5, marginTop: 4,
                whiteSpace: "pre-line", lineHeight: 1.4,
              }}>{s.sub}</div>
            </button>
            {i < 3 && (
              <div style={{ width: 28, height: 3, background: i < step ? c.yellow : "#D8E6F2", flexShrink: 0, position: "relative" }}>
                <span style={{ position: "absolute", right: -4, top: -5, fontSize: 11, color: i < step ? c.yellow : "#D8E6F2" }}>{"\u25B6"}</span>
              </div>
            )}
          </div>
        ))}
      </div>
      <p style={{ textAlign: "center", color: c.slate, fontSize: 12.5, marginTop: 18, fontStyle: "italic", fontFamily: "'Museo Slab', 'Rockwell', serif" }}>
        Innovation validated at One City generates evidence that unlocks federal investment and shapes tools used globally.
      </p>
    </div>
  );
}

// ─── Calculator ───────────────────────────────────────────────────────────────
function Calculator() {
  const [gift, setGift] = useState(50000);
  const presets = [10000, 25000, 50000, 100000, 250000];
  return (
    <div style={{ background: c.navy, borderRadius: 20, padding: "28px 32px" }}>
      <div style={{ color: c.yellow, fontWeight: 800, fontSize: 15, marginBottom: 16, fontFamily: "'Oswald', sans-serif", textTransform: "uppercase", letterSpacing: "0.5px" }}>Your Impact Calculator</div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
        {presets.map(p => (
          <button key={p} onClick={() => setGift(p)} style={{
            padding: "8px 14px", borderRadius: 8, border: "2px solid",
            borderColor: gift === p ? c.yellow : "rgba(255,255,255,0.2)",
            background: gift === p ? c.yellow : "transparent",
            color: gift === p ? c.navy : c.white, fontWeight: 700, fontSize: 12.5, cursor: "pointer", transition: "all 0.18s",
            fontFamily: "'Museo Slab', 'Rockwell', serif",
          }}>${p.toLocaleString()}</button>
        ))}
      </div>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
        {[
          { label: "Your Gift", val: `$${gift.toLocaleString()}`, fg: c.white, bg: "rgba(255,255,255,0.07)" },
          { label: "+", val: null, fg: c.yellow, bg: "transparent", small: true },
          { label: "Match", val: `$${gift.toLocaleString()}`, fg: c.yellow, bg: "rgba(255,255,255,0.07)" },
          { label: "=", val: null, fg: c.yellow, bg: "transparent", small: true },
          { label: "Total Impact", val: `$${(gift * 2).toLocaleString()}`, fg: c.navy, bg: c.yellow },
        ].map((x, i) => x.small ? (
          <div key={i} style={{ fontSize: 22, color: x.fg, fontWeight: 900 }}>{x.label}</div>
        ) : (
          <div key={i} style={{ flex: 1, minWidth: 100, background: x.bg, borderRadius: 11, padding: "16px 18px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: x.bg === c.yellow ? c.navy : "rgba(255,255,255,0.5)", marginBottom: 4, fontFamily: "'Museo Slab', 'Rockwell', serif" }}>{x.label}</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: x.fg, fontFamily: "'Oswald', sans-serif" }}>{x.val}</div>
          </div>
        ))}
      </div>
      <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, marginTop: 14, marginBottom: 0, textAlign: "center" }}>
        Anonymous match available 2025-26 and 2026-27 only. Every dollar doubled until $2.5M is raised.
      </p>
    </div>
  );
}

// ─── Icon card (no dangerouslySetInnerHTML) ────────────────────────────────────
function IconCard({ icon, label, text }) {
  return (
    <div style={{ flex: 1, minWidth: 175, background: c.lightBlue, borderRadius: 13, padding: "18px", borderTop: `4px solid ${c.blue}` }}>
      <div style={{ fontSize: 26, marginBottom: 8 }}>{icon}</div>
      <div style={{ fontWeight: 800, color: c.navy, fontSize: 13.5, marginBottom: 5, fontFamily: "'Oswald', sans-serif", textTransform: "uppercase" }}>{label}</div>
      <div style={{ color: c.slate, fontSize: 12.5, lineHeight: 1.5, fontFamily: "'Museo Slab', 'Rockwell', serif" }}>{text}</div>
    </div>
  );
}

// ─── Impact card (no dangerouslySetInnerHTML) ─────────────────────────────────
function ImpactCard({ icon, text }) {
  return (
    <div style={{
      background: c.white, border: `1.5px solid ${c.border}`, borderRadius: 13,
      padding: "16px 18px", display: "flex", gap: 11, alignItems: "flex-start",
    }}>
      <div style={{ fontSize: 24, flexShrink: 0 }}>{icon}</div>
      <div style={{ color: c.navy, fontSize: 13.5, lineHeight: 1.5, fontWeight: 500, fontFamily: "'Museo Slab', 'Rockwell', serif" }}>{text}</div>
    </div>
  );
}

function Sec({ title, accent = c.yellow, children }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <SH title={title} accent={accent} />
      {children}
    </div>
  );
}

// ─── Content sections ─────────────────────────────────────────────────────────
const CONTENT = {
  crisis: () => (
    <>
      <Sec title="A National Crisis, Worst Here" accent={c.orange}>
        <div style={{ background: c.orange, borderRadius: 14, padding: "24px 28px", marginBottom: 20 }}>
          <div style={{ fontSize: 50, fontWeight: 900, color: c.white, fontFamily: "'Oswald', sans-serif", lineHeight: 1 }}>70%</div>
          <div style={{ color: c.white, fontSize: 18, fontWeight: 700, marginTop: 6, fontFamily: "'Oswald', sans-serif" }}>of all 4th graders nationwide read below grade level</div>
          <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 13.5, marginTop: 6, fontFamily: "'Museo Slab', 'Rockwell', serif" }}>One of the strongest predictors of lifetime earnings and incarceration rates</div>
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 24 }}>
          <Stat n={45} suffix="-pt" label="Black-White reading gap" sub="4th grade, national" bg={c.navy} />
          <Stat n={38} suffix="-pt" label="Black-White math gap" sub="8th grade, national" bg={c.navy} />
        </div>
        <div style={{ background: c.lightBlue, borderRadius: 14, padding: "24px 28px", borderLeft: `5px solid ${c.orange}` }}>
          <h3 style={{ margin: "0 0 12px 0", color: c.navy, fontSize: 16, fontWeight: 800, fontFamily: "'Oswald', sans-serif", textTransform: "uppercase" }}>Wisconsin: Ground Zero</h3>
          <p style={{ margin: "0 0 16px 0", color: c.slate, fontSize: 13.5, lineHeight: 1.65, fontFamily: "'Museo Slab', 'Rockwell', serif" }}>
            Wisconsin ranks <strong style={{ color: c.orange }}>3rd lowest nationally</strong> for Black 4th grade reading proficiency.
            Only 8% of Black 4th graders read proficiently — vs. 54% of white students. A 46-point gap, 4th largest in the nation.
          </p>
          <Bar label="White students — reading proficient" value={54} color={c.blue} />
          <Bar label="Black students — reading proficient (WI)" value={8} color={c.orange} />
          <Bar label="National average — all students" value={16} color={c.slate} />
        </div>
      </Sec>
      <Sec title="Wisconsin Schools: One City as the Outlier" accent={c.blue}>
        <p style={{ color: c.slate, fontSize: 13.5, lineHeight: 1.65, marginBottom: 18, fontFamily: "'Museo Slab', 'Rockwell', serif" }}>
          The charts below plot every Madison-area school's academic growth percentile against the share of Black students enrolled.
          The dashed trend line reveals a troubling pattern: more Black students typically means lower growth scores.
          One City is the clear exception — high Black enrollment, top-tier growth.
        </p>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <ScatterPlot title="Middle Schools — Madison Area" subtitle="Academic growth percentile vs. % Black students"
            others={MS_SCHOOLS} ocX={72} ocY={97.5} callout="98.7%" calloutSub="of WI middle schools outperformed in academic growth" />
          <ScatterPlot title="Elementary Schools — Madison Area" subtitle="Academic growth percentile vs. % Black students"
            others={ES_SCHOOLS} ocX={70} ocY={76} callout="75.8%" calloutSub="of WI elementary schools outperformed in academic growth" />
        </div>
        <p style={{ color: c.slate, fontSize: 11.5, marginTop: 10, fontStyle: "italic" }}>
          Source: 2024-25 Wisconsin DPI Report Card data for Madison metro schools.
        </p>
      </Sec>
    </>
  ),

  model: () => (
    <>
      <Sec title="The Teaching Hospital Model">
        <div style={{ background: c.navy, borderRadius: 18, padding: "28px 32px", marginBottom: 20, color: c.white }}>
          <p style={{ fontSize: 17.5, lineHeight: 1.7, margin: 0, fontFamily: "'Museo Slab', 'Rockwell', serif" }}>
            Teaching hospitals train the next generation of physicians <em>while</em> delivering cutting-edge care to real patients.
            One City operates on the same principle — a publicly accountable school where{" "}
            <strong style={{ color: c.yellow }}>real students with real needs drive real innovation</strong>,
            and everything that works here travels outward through proven distribution networks.
          </p>
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 24 }}>
          <IconCard icon={EMOJI.family} label="Two-Generation" text="Financial literacy, homeownership support, and family engagement alongside student academics" />
          <IconCard icon={EMOJI.calendar} label="Extended Year" text="Longer school year with targeted support for students facing the largest gaps" />
          <IconCard icon={EMOJI.microscope} label="Innovation Lab" text="Active R&D partnerships with UFLI and Project Read AI, co-developed with students who benefit most" />
          <IconCard icon={EMOJI.barChart} label="Public Accountability" text="Fully accountable to Wisconsin DPI — results published and compared against all state schools" />
        </div>
      </Sec>
      <Sec title="Who One City Serves">
        <div style={{ background: c.navy, borderRadius: 18, padding: "26px 30px", display: "flex", gap: 24, flexWrap: "wrap", alignItems: "center", marginBottom: 16 }}>
          <div style={{ textAlign: "center", flexShrink: 0 }}>
            <div style={{ fontSize: 58, fontWeight: 900, color: c.yellow, fontFamily: "'Oswald', sans-serif", lineHeight: 1 }}>400</div>
            <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 12.5, marginTop: 3 }}>Current Scholars</div>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, marginTop: 2 }}>Tuition-free · Open to all WI students</div>
          </div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <Bar label="Students of Color" value={94} color={c.yellow} dark />
            <Bar label="Black Students" value={68} color={c.yellow} dark />
            <Bar label="Hispanic Students" value={11} color={c.yellow} dark />
            <Bar label="Economically Disadvantaged" value={70} color={c.yellow} dark />
            <Bar label="Special Education" value={17} color={c.yellow} dark />
          </div>
        </div>
        <p style={{ color: c.slate, fontSize: 13.5, lineHeight: 1.7, fontFamily: "'Museo Slab', 'Rockwell', serif" }}>
          When innovation succeeds here — alongside students facing the steepest barriers — it's proven for the students who need it most everywhere.
        </p>
      </Sec>
    </>
  ),

  results: () => (
    <>
      <Sec title="Student Outcomes">
        <div style={{ background: c.blue, borderRadius: 18, padding: "28px 32px", marginBottom: 20, textAlign: "center" }}>
          <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 14, marginBottom: 12, fontWeight: 600, fontFamily: "'Museo Slab', 'Rockwell', serif" }}>
            Black Students Reading Proficiency — One Year
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 18, flexWrap: "wrap" }}>
            <div>
              <div style={{ fontSize: 70, fontWeight: 900, color: "rgba(255,255,255,0.3)", fontFamily: "'Oswald', sans-serif", lineHeight: 1 }}>2%</div>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>Year Start</div>
            </div>
            <div style={{ fontSize: 34, color: c.yellow }}>{"\u2192"}</div>
            <div>
              <div style={{ fontSize: 70, fontWeight: 900, color: c.yellow, fontFamily: "'Oswald', sans-serif", lineHeight: 1 }}>21%</div>
              <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 12 }}>Year End</div>
            </div>
            <div style={{ background: "rgba(0,0,0,0.16)", borderRadius: 12, padding: "12px 18px", textAlign: "left" }}>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 10.5, marginBottom: 2 }}>vs. Black Students Statewide</div>
              <div style={{ fontSize: 44, fontWeight: 900, color: c.orange, fontFamily: "'Oswald', sans-serif", lineHeight: 1 }}>8%</div>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 10.5 }}>Proficient</div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 24 }}>
          <div style={{ flex: 1, background: c.yellow, borderRadius: 14, padding: "20px", textAlign: "center" }}>
            <div style={{ fontSize: 12.5, color: c.navy, fontWeight: 700, marginBottom: 6, fontFamily: "'Museo Slab', 'Rockwell', serif" }}>Latino Reading Proficiency</div>
            <div style={{ fontSize: 36, fontWeight: 900, color: c.navy, fontFamily: "'Oswald', sans-serif", lineHeight: 1 }}>16% {"\u2192"} 57%</div>
            <div style={{ fontSize: 11, color: c.navy, opacity: 0.6, marginTop: 5 }}>Two years</div>
          </div>
          <Stat n={98.7} dec={1} suffix="%" label="of WI middle schools outperformed in academic growth" bg={c.navy} />
          <Stat n={75.8} dec={1} suffix="%" label="of WI elementary schools outperformed in academic growth" bg={c.navy} />
        </div>
      </Sec>
      <Sec title="School Data: One City vs. Madison" accent={c.blue}>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <ScatterPlot title="Middle Schools" subtitle="Academic growth percentile vs. % Black students enrolled"
            others={MS_SCHOOLS} ocX={72} ocY={97.5} callout="98.7%" calloutSub="of WI middle schools outperformed" />
          <ScatterPlot title="Elementary Schools" subtitle="Academic growth percentile vs. % Black students enrolled"
            others={ES_SCHOOLS} ocX={70} ocY={76} callout="75.8%" calloutSub="of WI elementary schools outperformed" />
        </div>
      </Sec>
      <Sec title="State Recognition" accent={c.blue}>
        <div style={{ background: c.blue, borderRadius: 16, padding: "24px 28px", display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap", marginBottom: 20 }}>
          <div style={{ flex: 1, minWidth: 170 }}>
            <div style={{ color: c.yellow, fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>Wisconsin DPI Report Card</div>
            <div style={{ fontSize: 30, fontWeight: 900, color: c.white, fontFamily: "'Oswald', sans-serif", lineHeight: 1.1 }}>EXCEEDS EXPECTATIONS</div>
            <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 13, marginTop: 9, lineHeight: 1.5, fontFamily: "'Museo Slab', 'Rockwell', serif" }}>
              Highest possible rating for two consecutive years — both elementary and middle school.
            </div>
          </div>
          <div style={{ fontSize: 48 }}>{"\u2B50\u2B50\u2B50\u2B50"}</div>
        </div>
        <Quote
          text="UFLI is partnering with One City as a model demonstration site. One City's approach isn't just effective locally. It's a blueprint for closing achievement gaps nationally."
          name="Dr. Holly Lane"
          title="Director, University of Florida Literacy Institute · Author of UFLI Foundations · Congressional Testimony, February 10, 2026"
          photo={IMGS.holly}
        />
      </Sec>
    </>
  ),

  scale: () => (
    <>
      <Sec title="One City in a Bigger Ecosystem">
        <div style={{ background: c.navy, borderRadius: 18, padding: "26px 30px", marginBottom: 20 }}>
          <p style={{ color: c.white, fontSize: 17, lineHeight: 1.7, margin: 0, fontFamily: "'Museo Slab', 'Rockwell', serif" }}>
            One City isn't just a school. It's <strong style={{ color: c.yellow }}>where the evidence gets made</strong> — the place where the most important
            literacy innovations are developed and validated alongside students who have the most to gain
            and the least margin for error.
          </p>
        </div>
        <Pipeline />
      </Sec>
      <Sec title="Two Global Distribution Networks">
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 24 }}>
          <div style={{ flex: 1, minWidth: 230, background: c.lightBlue, borderRadius: 16, padding: "24px 26px", borderTop: `5px solid ${c.blue}` }}>
            <div style={{ marginBottom: 14 }}><UFLIBadge /></div>
            <div style={{ fontSize: 36, fontWeight: 900, color: c.blue, fontFamily: "'Oswald', sans-serif", lineHeight: 1 }}>700,000+</div>
            <div style={{ color: c.slate, fontSize: 12, marginTop: 3, marginBottom: 12 }}>classrooms worldwide</div>
            <p style={{ color: c.slate, fontSize: 13, lineHeight: 1.6, margin: 0, fontFamily: "'Museo Slab', 'Rockwell', serif" }}>
              The most widely adopted phonics program on the planet. One City is UFLI's{" "}
              <strong>designated Midwest hub and training site</strong> — where UFLI's curriculum meets real classrooms
              and where educators across the region are trained.
            </p>
          </div>
          <div style={{ flex: 1, minWidth: 230, background: c.lightBlue, borderRadius: 16, padding: "24px 26px", borderTop: `5px solid ${c.green}` }}>
            <div style={{ marginBottom: 14 }}><ProjectReadBadge /></div>
            <div style={{ fontSize: 36, fontWeight: 900, color: c.green, fontFamily: "'Oswald', sans-serif", lineHeight: 1 }}>240,000+</div>
            <div style={{ color: c.slate, fontSize: 12, marginTop: 3, marginBottom: 4 }}>classrooms</div>
            <div style={{ fontSize: 24, fontWeight: 900, color: c.green, fontFamily: "'Oswald', sans-serif" }}>115+</div>
            <div style={{ color: c.slate, fontSize: 12, marginBottom: 12 }}>countries</div>
            <p style={{ color: c.slate, fontSize: 13, lineHeight: 1.6, margin: 0, fontFamily: "'Museo Slab', 'Rockwell', serif" }}>
              An AI tutor that listens to students read aloud and delivers real-time phonics instruction.
              <strong> Developed and continuously refined at One City Schools.</strong>
            </p>
          </div>
        </div>
        <div style={{ background: "#FFFBEA", borderRadius: 13, padding: "20px 24px", borderLeft: `5px solid ${c.yellow}`, marginBottom: 22 }}>
          <div style={{ fontWeight: 800, color: c.navy, fontSize: 14.5, marginBottom: 6, fontFamily: "'Oswald', sans-serif", textTransform: "uppercase" }}>The Federal Proof Point</div>
          <p style={{ color: c.slate, fontSize: 13.5, lineHeight: 1.65, margin: 0, fontFamily: "'Museo Slab', 'Rockwell', serif" }}>
            Research conducted at One City with Dr. Matthew Burns generated fluency growth data rigorous enough to contribute
            to a <strong>US Department of Education grant now funding UFLI's next generation of AI-integrated literacy tools</strong> —
            with One City as a core implementation site. This is what it looks like when a school generates evidence that moves the whole field.
          </p>
        </div>
        <Quote
          text="It's no exaggeration to say that the most cutting-edge and scalable work in literacy and artificial intelligence is happening at One City Schools, for the students that need it most."
          name="Vivek Ramakrishnan"
          title="Co-founder, Project Read AI · 240,000+ classrooms · 115+ countries"
          photo={IMGS.viv}
        />
      </Sec>
    </>
  ),

  invest: () => (
    <>
      <Sec title="Exceptional Results, Inadequate Funding" accent={c.orange}>
        <div style={{ background: c.orange, borderRadius: 14, padding: "24px 28px", marginBottom: 18, display: "flex", gap: 24, flexWrap: "wrap", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 42, fontWeight: 900, color: c.white, fontFamily: "'Oswald', sans-serif", lineHeight: 1 }}>54%</div>
            <div style={{ color: "rgba(255,255,255,0.9)", fontWeight: 700, fontSize: 13, fontFamily: "'Museo Slab', 'Rockwell', serif" }}>LESS than Madison Metro School District</div>
          </div>
          <div>
            <div style={{ fontSize: 42, fontWeight: 900, color: c.white, fontFamily: "'Oswald', sans-serif", lineHeight: 1 }}>27%</div>
            <div style={{ color: "rgba(255,255,255,0.9)", fontWeight: 700, fontSize: 13, fontFamily: "'Museo Slab', 'Rockwell', serif" }}>LESS than state average public schools</div>
          </div>
          <p style={{ color: "rgba(255,255,255,0.9)", fontSize: 13.5, lineHeight: 1.6, margin: 0, flex: 1, minWidth: 170, fontFamily: "'Museo Slab', 'Rockwell', serif" }}>
            One City outperforms 98.7% of Wisconsin middle schools on funding that's 54% below the district average.
            <strong style={{ color: c.white }}> 45% of operating costs are covered by philanthropy.</strong>
          </p>
        </div>
        <div style={{ background: c.lightBlue, borderRadius: 13, padding: "20px 24px", marginBottom: 24, borderLeft: `5px solid ${c.blue}` }}>
          <div style={{ fontWeight: 800, color: c.navy, fontSize: 14.5, marginBottom: 6, fontFamily: "'Oswald', sans-serif", textTransform: "uppercase" }}>The Path to Sustainability</div>
          <p style={{ color: c.slate, fontSize: 13.5, lineHeight: 1.65, margin: 0, fontFamily: "'Museo Slab', 'Rockwell', serif" }}>
            Demonstration Public School Legislation (AB 818/SB 818) would formally recognize One City as Wisconsin's education innovation lab —
            applying the Wisconsin Idea to K-12 and creating a sustainable, publicly-funded model.
            Your investment bridges operations while that legislation advances.
          </p>
        </div>
      </Sec>
      <Sec title="The Matching Opportunity">
        <Calculator />
      </Sec>
      <Sec title="What Your Investment Enables">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12, marginBottom: 24 }}>
          <ImpactCard icon={EMOJI.graduation} text="400+ students continue closing Wisconsin's achievement gaps in real time" />
          <ImpactCard icon={EMOJI.lab} text="Project Read AI R&D continues — refinements that reach 240,000+ classrooms globally" />
          <ImpactCard icon={EMOJI.book} text="One City serves as UFLI's Midwest training hub, shaping educator practice across the region" />
          <ImpactCard icon={EMOJI.building} text="Bridges to Demonstration School legislation and long-term sustainable public funding" />
        </div>
        <div style={{ background: c.navy, borderRadius: 18, padding: "26px 30px", textAlign: "center" }}>
          <p style={{ color: c.white, fontSize: 17.5, fontWeight: 700, lineHeight: 1.6, margin: "0 0 20px 0", fontFamily: "'Museo Slab', 'Rockwell', serif" }}>
            The data proves it works.<br />
            The match proves this moment matters.<br />
            <span style={{ color: c.yellow }}>Your investment proves we value what closes gaps.</span>
          </p>
          <a href="https://www.onecityschools.org/donate" target="_blank" rel="noopener noreferrer"
            style={{
              display: "inline-block", background: c.yellow, color: c.navy, fontWeight: 900, fontSize: 16,
              padding: "14px 36px", borderRadius: 11, textDecoration: "none", fontFamily: "'Oswald', sans-serif",
              letterSpacing: "1px", textTransform: "uppercase",
            }}>
            Make a Gift {"\u2192"}
          </a>
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11.5, marginTop: 13 }}>
            Questions? Contact Gail Wiseman, External Relations · (608) 514-6119
          </div>
        </div>
      </Sec>
    </>
  ),
};

const PATHS = [
  { id: "crisis", label: "The Crisis", icon: EMOJI.chart, tagline: "Why literacy is Wisconsin's most urgent challenge" },
  { id: "model", label: "The Model", icon: EMOJI.school, tagline: "A teaching hospital for education" },
  { id: "results", label: "The Results", icon: EMOJI.trending, tagline: "Data that demands attention" },
  { id: "scale", label: "The Scale", icon: EMOJI.globe, tagline: "How One City moves the whole field" },
  { id: "invest", label: "The Ask", icon: EMOJI.bulb, tagline: "A matched moment that won't repeat" },
];

// ─── Global styles (injected once) ────────────────────────────────────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@600;700;800;900&display=swap');
  * { box-sizing: border-box; }
  body { margin: 0; }
  button:focus-visible { outline: 2px solid ${c.yellow}; outline-offset: 2px; }
  a:focus-visible { outline: 2px solid ${c.yellow}; outline-offset: 2px; }
`;

export default function App() {
  const [active, setActive] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const topRef = useRef(null);
  const styleInjected = useRef(false);

  // Inject global styles once
  useEffect(() => {
    if (styleInjected.current) return;
    styleInjected.current = true;
    const style = document.createElement("style");
    style.textContent = GLOBAL_CSS;
    document.head.appendChild(style);
  }, []);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const go = useCallback((id) => {
    setActive(id);
    setTimeout(() => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
  }, []);

  return (
    <div style={{ fontFamily: "'Museo Slab', 'Rockwell', Georgia, serif", background: c.offWhite, minHeight: "100vh" }}>

      {/* NAV */}
      <nav style={{
        background: c.navy, padding: "0 24px", position: "sticky", top: 0, zIndex: 200,
        boxShadow: scrolled ? "0 3px 18px rgba(0,0,0,0.22)" : "none", transition: "box-shadow 0.3s",
      }}>
        <div style={{
          maxWidth: 980, margin: "0 auto", display: "flex", alignItems: "center",
          justifyContent: "space-between", padding: "10px 0", gap: 8,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
            <img src={IMGS.oneCity} alt="One City Schools" style={{
              height: 40, objectFit: "contain",
              filter: "brightness(0) invert(1)",
            }} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            {active && (
              <button onClick={() => setActive(null)} style={{
                background: "rgba(255,255,255,0.1)",
                border: "none", color: c.white, padding: "7px 13px", borderRadius: 7,
                cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: "'Museo Slab', 'Rockwell', serif",
              }}>{"\u2190"} Overview</button>
            )}
            <a href="https://www.onecityschools.org/donate" target="_blank" rel="noopener noreferrer"
              style={{
                background: c.yellow, color: c.navy, padding: "8px 16px", borderRadius: 8,
                fontWeight: 800, fontSize: 12.5, textDecoration: "none", fontFamily: "'Oswald', sans-serif",
                letterSpacing: "0.5px", textTransform: "uppercase", whiteSpace: "nowrap",
              }}>Donate</a>
          </div>
        </div>
      </nav>

      <div ref={topRef} style={{ maxWidth: 980, margin: "0 auto", padding: "0 20px 80px" }}>

        {!active ? (
          <>
            {/* HERO */}
            <div style={{ padding: "48px 0 32px", textAlign: "center" }}>
              <div style={{
                display: "inline-block", background: c.yellow, color: c.navy, fontWeight: 800,
                fontSize: 10.5, letterSpacing: 2.2, textTransform: "uppercase", padding: "5px 14px",
                borderRadius: 20, marginBottom: 16, fontFamily: "'Museo Slab', 'Rockwell', serif",
              }}>
                A MATCHED GIVING OPPORTUNITY · 2025 – 2027
              </div>
              <h1 style={{
                fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 900, color: c.navy, fontFamily: "'Oswald', sans-serif",
                lineHeight: 1.1, margin: "0 0 14px 0", textTransform: "uppercase", letterSpacing: "0.4px",
              }}>
                A Scalable Model for<br />
                <span style={{ color: c.blue }}>Addressing the Literacy Crisis</span>
              </h1>
              <p style={{ color: c.slate, fontSize: 16.5, lineHeight: 1.72, maxWidth: 560, margin: "0 auto 28px", fontFamily: "'Museo Slab', 'Rockwell', serif" }}>
                One City Schools is where the world's most widely-adopted phonics program and the leading AI literacy
                tutor are built, tested, and proven — together, <em>with</em> the students who stand to benefit most.
              </p>

              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 22 }}>
                <Stat n={240000} suffix="+" label="Classrooms using One City innovations" bg={c.blue} />
                <Stat n={115} suffix="+" label="Countries reached" bg={c.navy} />
                <Stat n={98.7} dec={1} suffix="%" label="of WI middle schools outperformed" bg={c.blue} />
              </div>

              {/* Partner logos */}
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 24, flexWrap: "wrap",
                justifyContent: "center", background: c.white, border: `1.5px solid ${c.border}`,
                borderRadius: 16, padding: "16px 28px", maxWidth: 540,
              }}>
                <div style={{
                  color: c.slate, fontSize: 10.5, fontWeight: 700, letterSpacing: 0.8,
                  textTransform: "uppercase", width: "100%", textAlign: "center", marginBottom: 2,
                }}>In Partnership With</div>
                <UFLIBadge />
                <div style={{ width: 1, height: 38, background: c.border, flexShrink: 0 }} />
                <ProjectReadBadge />
              </div>
            </div>

            {/* TWO-COLUMN */}
            <div style={{ display: "flex", gap: 18, alignItems: "flex-start", flexWrap: "wrap", marginBottom: 36 }}>
              <div style={{ flex: "1 1 290px" }}>
                <div style={{
                  color: c.slate, fontSize: 11, fontWeight: 700, letterSpacing: 0.9,
                  textTransform: "uppercase", marginBottom: 10,
                }}>Explore the story</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {PATHS.map(p => <PathBtn key={p.id} path={p} onClick={() => go(p.id)} />)}
                </div>
              </div>

              <div style={{ flex: "1 1 270px", display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{
                  color: c.slate, fontSize: 11, fontWeight: 700, letterSpacing: 0.9,
                  textTransform: "uppercase", marginBottom: 10,
                }}>What national leaders say</div>
                <Quote compact
                  text="UFLI is partnering with One City as a model demonstration site. One City's approach isn't just effective locally. It's a blueprint for closing achievement gaps nationally."
                  name="Dr. Holly Lane"
                  title="Director, UFLI · Author of UFLI Foundations · Congressional Testimony, February 10, 2026"
                  photo={IMGS.holly}
                />
                <Quote compact
                  text="It's no exaggeration to say that the most cutting-edge and scalable work in literacy and artificial intelligence is happening at One City Schools."
                  name="Vivek Ramakrishnan"
                  title="Co-founder, Project Read AI · 240,000+ classrooms · 115+ countries"
                  photo={IMGS.viv}
                />
              </div>
            </div>

            {/* Match CTA */}
            <div style={{ background: c.navy, borderRadius: 18, padding: "28px 32px", textAlign: "center" }}>
              <div style={{
                color: c.yellow, fontWeight: 700, fontSize: 11, letterSpacing: 1.5,
                textTransform: "uppercase", marginBottom: 9, fontFamily: "'Museo Slab', 'Rockwell', serif",
              }}>Limited Time Match</div>
              <p style={{ color: c.white, fontSize: 17, fontWeight: 700, margin: "0 0 16px 0", fontFamily: "'Museo Slab', 'Rockwell', serif" }}>
                An anonymous donor will match every dollar raised up to $2.5M — for 2025-26 and 2026-27.
              </p>
              <a href="https://www.onecityschools.org/donate" target="_blank" rel="noopener noreferrer"
                style={{
                  display: "inline-block", background: c.yellow, color: c.navy, fontWeight: 900, fontSize: 14.5,
                  padding: "12px 32px", borderRadius: 10, textDecoration: "none", fontFamily: "'Oswald', sans-serif",
                  letterSpacing: "1px", textTransform: "uppercase",
                }}>Make a Gift {"\u2192"}</a>
            </div>
          </>
        ) : (
          <div style={{ paddingTop: 38 }}>
            <div style={{ marginBottom: 26 }}>
              <div style={{ fontSize: 24, marginBottom: 5 }}>{PATHS.find(p => p.id === active)?.icon}</div>
              <h1 style={{
                fontSize: "clamp(26px, 4vw, 34px)", fontWeight: 900, color: c.navy, fontFamily: "'Oswald', sans-serif",
                margin: "0 0 5px 0", textTransform: "uppercase",
              }}>
                {PATHS.find(p => p.id === active)?.label}
              </h1>
              <p style={{ color: c.slate, fontSize: 14.5, margin: 0, fontFamily: "'Museo Slab', 'Rockwell', serif" }}>{PATHS.find(p => p.id === active)?.tagline}</p>
            </div>

            {CONTENT[active]?.()}

            <div style={{ borderTop: `2px solid ${c.border}`, paddingTop: 26, marginTop: 40 }}>
              <div style={{
                color: c.slate, fontSize: 11, fontWeight: 700, letterSpacing: 0.9,
                textTransform: "uppercase", marginBottom: 12,
              }}>Explore more</div>
              <div style={{ display: "flex", gap: 9, flexWrap: "wrap" }}>
                {PATHS.filter(p => p.id !== active).map(p => (
                  <ExploreBtn key={p.id} path={p} onClick={() => go(p.id)} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
