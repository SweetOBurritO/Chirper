export const databinding = (bindings, domModel) => {
    const eventBindings = [];
    const clearEventBindings = () => {
        eventBindings.forEach(eventArgs => {
            document.body.removeEventListener(...eventArgs);
        });
    };

    const bindingTags = [
        {
            tag: 'bind-content',
            bind: (tag) => {
                domModel.querySelectorAll(`[${tag}]`).forEach(elem => {
                    const obs = bindings._data[elem.getAttribute(tag)];
                    elem.removeAttribute(tag);
                    bindValue(elem, obs);
                });
            }
        },
        {
            tag : 'bind-click',
            bind : (tag) => {

                const bindMethod = (e) => {
                    if(e.target.matches(`[${tag}]`)){
                        const method = bindings._methods[e.target.getAttribute(tag)];
                        method(e);
                    }
                };
                document.body.addEventListener('click', bindMethod);
                eventBindings.push( ['click', bindMethod] );
            }
        },
        {
            tag: 'bind-for',
            bind: (tag) => {
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
                        elem.appendChild(elemClone);
                    });
                });
            }
        },
        {
            tag: 'bind-view',
            bind: (tag) => {
                domModel.querySelectorAll(`[${tag}]`).forEach(elem => {
                    const view = bindings._data[elem.getAttribute(tag)];
                    view.getHtml.value()
                    .then((res)=> {
                        elem.innerHTML = '';
                        elem.removeAttribute(tag);
                        elem.appendChild(res);
                    });
                });

            }
        }
    ];

    const bindValue = (elem, observable) => {
        if(observable === undefined){
            return;
        }

        elem.innerHTML = observable.value;
        observable.subscribe(() => elem.innerHTML = observable.value);
    };

    const applyBindings = () => {
        bindingTags.forEach( binding => {
            binding.bind(binding.tag);
      });
    };

    applyBindings();

    return clearEventBindings;
};


