import React, {useState, useEffect, useCallback, useMemo, useRef} from 'react';
import moment from 'moment';
import cx from 'classnames'
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {fetchEventsRequest, fetchResourcesRequest} from '../store/events/actions';
import {getEventsSelector, getPendingSelector, getResourcesSelector} from '../store/events/selectors';
import {TEvent, TEventResource} from "../types";

import './style.scss'

const tableHeader = ['Event type', 'Details', 'Code', 'Date']

const History = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch();
	const events = useSelector(getEventsSelector);
	const resources = useSelector(getResourcesSelector);
	const loading = useSelector(getPendingSelector);
	const [items, setItems] = useState<TEvent[]>([]);
	const [width, setWidth] = useState<number>(window.innerWidth);
  const [element, setElement] = useState<HTMLDivElement | null>(null)
	const hasMore = items.length !== events.length
	const isMobile = width <= 768;

	const getResources = useCallback((currentItems: TEvent[]) => {
		const ids = currentItems.map((item: TEvent) => `${item.resource}/${item.id}`)
		dispatch(fetchResourcesRequest(ids));
	}, [dispatch])

	const fetchMoreData = useCallback(() => {
		setTimeout(() => {
			const filtered: TEvent[] = events.slice(items.length, items.length + 15);
			getResources(filtered)
			setItems(items.concat(filtered));
		}, 1500);
	}, [events, items, getResources]);

	const loader = React.useRef(fetchMoreData);

	const observer = useRef(new IntersectionObserver((entries) => {
		const first = entries[0] 
		if(first.isIntersecting ) {
			loader.current();
		}
	}, 
	{
		threshold: 1
	}))


	useEffect(() => {
		loader.current = fetchMoreData;
	  }, [fetchMoreData]);

	useEffect(() => {
		if (events.length) {
			const filtered = events?.slice(0, 14);
			
			getResources(filtered)
		
			setItems(filtered);
		}
	}, [events, getResources])

	useEffect(() => {
		dispatch(fetchEventsRequest())
	}, [dispatch])

	const parsedEvents = useMemo(() => {
		if (!items) return null;

		return items.map((item: TEvent, index: number) => {
			return {
				...item,
				...resources[index]
			}
		});
	}, [items, resources])
	
	const renderValues = (event: TEventResource) => {
		if (!event.values) return;

		if (typeof event.values[0] === 'string') return `: ${event.values.join(',')}`;

		let parsedValues = '';

		event.values.forEach((val: any, ind: number) => {
			let comma = ind === event.values.length - 1 ? '' : ',';
			parsedValues = parsedValues + `${val.value} ${val.unit}${comma} `
		})

		if (!parsedValues) return '';

		return `: ${parsedValues}`;
	}

    useEffect(() => {
		const currElement = element;
		const currObserver = observer.current

		if(currElement) {
			currObserver.observe(currElement)
		}
	
		return () => {
			if(currElement) {
				currObserver.unobserve(currElement)
			}
		}

	}, [element])

	const handleWindowSizeChange = () => {
		setWidth(window.innerWidth);
	}

	useEffect(() => {
		window.addEventListener('resize', handleWindowSizeChange);
		return () => {
			window.removeEventListener('resize', handleWindowSizeChange);
		}
	}, []);

	const chooseColor = (type: string) => {
		switch (type) {
			case 'Condition':
				return '#b3d1ff'
			case 'MedicationStatement':
				return '#fbf050'
			case 'Diagnosis':
				return '#ffcce6'
			case 'Observation':
				return '#ffdf80'
			case 'CarePlan':
				return '#80ffcc'
			case 'AllergyIntolerance':
				return '#ffb3b3'
			case 'Appointment':
				return '#b3c6ff'
			case 'Procedure':
				return '#9c9c9c'
			default:
				break;
		}
	}


	if (!events.length) return null;
	if (!parsedEvents) return null;

  return (
		<>
			<button className='go-to' onClick={() => navigate('/')}>
				Go to home page
			</button>
			<div className='main-container'>
				<div id="scrollableDiv" className='table-style' style={{height: '88vh', overflow: "auto", minWidth: isMobile ? '' : '820px'}}>
					
          {isMobile ?
            <div>
              {
                parsedEvents.map((item: any, index: number, arr: any) => {
                  const groupByType = arr[index - 1]?.name !== item.name && arr[index - 1]?.date !== item.date

                  return (
                    <div key={index} className={cx('mobile-container', groupByType && 'with-mobile-border')}>
                      <div className='mobile-types'>
                        {groupByType && <div className='event-type-container'>
                          <p className='type' style={{backgroundColor: chooseColor(item.name)}}>{item.name}</p>
                        </div>}
                        <p>{`${item.details} ${renderValues(item)}`}</p>
                      </div>
                      <div className='mobile-dates'>
                        {groupByType && <p>{moment(item.date).format('MMM DD, YYYY')}</p>}
                        <p className='mobile-code-style'>{item.code}</p>
                      </div>
                    </div>
                  )
                })
              }
            </div> :
            <table>
              <thead>
                <tr>
                  {tableHeader.map((item, index) => (
                    <td key={index}>{item}</td>
                  ))}
                </tr>
              </thead>
              <tbody>
                {
                  parsedEvents.map((item: any, index: number, arr: any) => {
                    const groupByType = arr[index - 1]?.name !== item.name && arr[index - 1]?.date !== item.date
                    return (
                      <tr key={index} className={cx(groupByType && 'with-border')}>
                        <td>
                          <div className='event-type-container'>
                            {groupByType && <p className='type' style={{backgroundColor: chooseColor(item.name)}}>{item.name}</p>}
                          </div>
                        </td>
                        <td className='details'>{item.details} {renderValues(item)}</td>
                        <td className='codes'>{item.code}</td>
                        <td className={cx(groupByType ? 'dark-text' : 'grey-text')}>{moment(item.date).format('MMM DD, YYYY')}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>}
          <div className="loader-wrapper">
            {!loading && hasMore && <div ref={setElement} className="loader" />}
          </div>
				</div>
			</div>
		</>
	)
}

export default History