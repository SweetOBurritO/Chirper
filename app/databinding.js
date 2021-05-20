export const databinding = async (bindings, domModel, view) => {
    const eventBindings = [];
    const clearEventBindings = () => {
        eventBindings.forEach(eventArgs => {
            document.body.removeEventListener(...eventArgs);
        });
    };

    const bindingTags = [

        {
            tag: 'bind-for',
            bind: async (tag) => {
                domModel.querySelectorAll(`[${tag}]`).forEach(elem => {
                    const values = bindings._data[elem.getAttribute(tag)];

                    elem.removeAttribute(tag);
                    const elemTemplate = elem.cloneNode(true);
                    elem.innerHTML = '';

                    values.forEach((value) => {
                        const elemClone = elemTemplate.cloneNode(true);
                        elemClone.querySelectorAll('[for-value]').forEach(elem => {
                            const attributeValue = elem.getAttribute('for-value');
                            const obs = attributeValue ? value[attributeValue] : value ;
                            elem.removeAttribute('for-value');
                            bindValue(elem, obs);
                        });
                        elemClone.querySelectorAll('[for-link]').forEach(elem => {
                            const attributeValue = elem.getAttribute('for-link');
                            const obs = attributeValue ? value[attributeValue] : value ;
                            elem.removeAttribute('for-link');
                            bindLink(elem, obs);
                        });
                        elem.appendChild(elemClone);
                    });
                });
            }
        },
        {
            tag: 'bind-content',
            bind: async (tag) => {
                domModel.querySelectorAll(`[${tag}]`).forEach(elem => {
                    const obs = bindings._data[elem.getAttribute(tag)];
                    elem.removeAttribute(tag);
                    bindValue(elem, obs);
                });
            }
        },
        {
            tag: 'bind-src',
            bind: async (tag) => {
                domModel.querySelectorAll(`[${tag}]`).forEach(elem => {
                    const obs = bindings._data[elem.getAttribute(tag)];
                    elem.removeAttribute(tag);
                    bindSource(elem, obs);
                });
            }
        },
        {
            tag : 'bind-click',
            bind: async (tag) => {
                const bindMethod = (e) => {
                    if(e.target.matches(`[${tag}]`)){
                        const method = bindings._methods[e.target.getAttribute(tag)];
                        if(method !== undefined)
                            method.bind(bindings.view)(e);
                    }
                };
                document.body.addEventListener('click', bindMethod);
                eventBindings.push( ['click', bindMethod] );
            }
        },
        {
            tag: 'bind-view',
            bind: async (tag) => {
                domModel.querySelectorAll(`[${tag}]`).forEach(elem => {
                    const boundView = bindings._data[elem.getAttribute(tag)];
                    boundView.getHtml.value()
                    .then((res)=> {
                        elem.innerHTML = '';
                        elem.removeAttribute(tag);
                        elem.appendChild(res);
                    });
                });

            }
        },
        {
            tag: 'bind-if',
            bind: async (tag) => {
                domModel.querySelectorAll(`[${tag}]`).forEach(elem => {
                    const obs = bindings._data[elem.getAttribute(tag)];
                    const cloneNode = elem.cloneNode(true);
                    if (!obs.value){
                        elem.innerHTML = '';
                    }
                    elem.removeAttribute(tag);
                    obs.subscribe(()=> {
                        if (!obs.value) {
                            elem.innerHTML = '';
                        }
                        else {
                            elem.appendChild(cloneNode);
                        }
                    });
                })
            }
                
        },
        {
            tag: 'bind-component',
            bind: async (tag) => {
                const components = domModel.querySelectorAll(`[${tag}]`);
                for(let i = 0; i < components.length; ++i)
                {
                    const elem = components[i];
                    const component = bindings._data[elem.getAttribute(tag)];
                    const propList = bindings._data[elem.getAttribute('bind-props-list')];
                    const props = bindings._data[elem.getAttribute('bind-props')];
                    const cssLink =  await component.getCss.value.call(component);
                    view.componentCss.push(cssLink);

                    if(propList === undefined || propList === null)
                    {
                        const htmlVal = await component.getHtml.value(props);
                        elem.innerHTML = '';
                        elem.removeAttribute(tag);
                        elem.removeAttribute('bind-props');
                        elem.appendChild(htmlVal);
                        continue;
                    }

                    elem.removeAttribute('bind-props-list');
                    propList.forEach( async propItem => {
                        const htmlVal = await component.getHtml.value(propItem);
                        elem.appendChild(htmlVal);
                    });
                }

            }
        },
        {
            tag: 'bind-input',
            bind: async (tag) => {
                domModel.querySelectorAll(`[${tag}]`).forEach(elem => {
                    const obs = bindings._data[elem.getAttribute(tag)];
                    elem.removeAttribute(tag);
                    bindInput(elem, obs);
                });
            }
        },
        {
            tag: 'bind-attribute',
            bind: async (tag) => {
                domModel.querySelectorAll(`[${tag}]`).forEach(elem => {
                    const attributeName = elem.getAttribute(tag);
                    const attributeValue = bindings._data[elem.getAttribute('attribute-value')];
                    elem.setAttribute(attributeName,attributeValue);
                    elem.removeAttribute(tag);
                    elem.removeAttribute('attribute-value');
                    elem.removeAttribute(tag);
                });
            }
        },

    ];

    const bindValue = (elem, observable) => {
        if(observable === undefined){
            return;
        }

        elem.innerHTML = observable.value;
        observable.subscribe(() => elem.innerHTML = observable.value);
    };

    const bindLink = (elem, observable) => {
        if (observable === undefined) {
            return;
        }

        elem.href = observable.value;
        observable.subscribe(() => elem.href = observable.value);
    };

    const bindSource = (elem, observable) => {
        if (observable === undefined) {
            return;
        }

        elem.src = observable.value;
        observable.subscribe(() => elem.src = observable.value);
    };

    const bindInput = (elem, observable) => {
        if (observable === undefined) {
            return;
        }

        elem.value = observable.value;
        observable.subscribe(() => elem.value = observable.value);
    };

    const applyBindings = async () => {
        const bindingPromises =  bindingTags.map( (binding) => {
              return binding.bind(binding.tag);
      });
      await Promise.all(bindingPromises);
    };

    await applyBindings();

    return clearEventBindings;
};


